import { useState, useEffect } from 'react'

const LIMIT = 12

export function useProducts() {
  const [products,    setProducts]   = useState([])
  const [categories,  setCategories] = useState(['All'])
  const [loading,     setLoading]    = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error,       setError]      = useState(null)
  const [skip,        setSkip]       = useState(0)
  const [total,       setTotal]      = useState(0)

  useEffect(() => {
    async function fetchInitial() {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=0&select=id,title,price,thumbnail,category,rating,description,stock`),
          fetch('https://dummyjson.com/products/categories'),
        ])

        if (!productsRes.ok) throw new Error('Failed to fetch')

        const productsData   = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(normalize(productsData.products))
        setTotal(productsData.total)
        setSkip(LIMIT)
        setCategories(['All', ...categoriesData.map(c =>
          typeof c === 'string' ? c : c.name
        )])
      } catch (err) {
        console.error(err)
        setError('Failed to load products. Check your internet connection.')
      } finally {
        setLoading(false)
      }
    }
    fetchInitial()
  }, [])

  async function loadMore() {
    try {
      setLoadingMore(true)
      const res  = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}&select=id,title,price,thumbnail,category,rating,description,stock`
      )
      const data = await res.json()
      setProducts(prev => [...prev, ...normalize(data.products)])
      setSkip(prev => prev + LIMIT)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingMore(false)
    }
  }

  const hasMore = skip < total

  return { products, categories, loading, loadingMore, error, loadMore, hasMore, total }
}

function normalize(list) {
  return list.map(p => ({
    id:          p.id,
    name:        p.title,
    price:       p.price,
    image:       p.thumbnail,
    category:    typeof p.category === 'string' ? p.category : p.category?.name ?? '',
    rating:      p.rating,
    description: p.description,
    stock:       p.stock,
  }))
}