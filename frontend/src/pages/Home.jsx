// Home.jsx (Updated with reduced spacing)
import React from 'react'
import Hero from '../components/Hero'
import LatestCollectionHeader from '../components/LatestCollectionHeader'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import FeaturesAndSubscribe from '../components/FeaturesAndSubscribes'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollectionHeader/>
      <LatestCollection/>
      <BestSellers/>
      <FeaturesAndSubscribe/>
    </div>
  )
}

export default Home