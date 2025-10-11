import React from 'react';
import Banner from '../../Components/Banner';
// import Map from '../../Components/MapViwe';
import MapView from '../../Components/MapViwe';
import TopRoom from './TopRoom';
import Reviwe from '../../Components/Reviews';
import Reviews from '../../Components/Reviews';
import Newsletter from './Newsletter';
import FAQ from './FAQ ';

const Home = () => {
    return (
        <>



        {/* Banner */}
        <section className='mt-20'>
        <Banner></Banner>
        </section>
        <section className='pt-24'>
          <div>
            <h1 className='text-7xl text-center py-5 mb-8'>Map </h1>
          </div>
          <MapView></MapView>
        </section>
        {/* top rated rooms */}
        <section className='mt-34'>

      <TopRoom></TopRoom>

        </section>

<section className='mt-20'>
          <Newsletter></Newsletter>
        </section>

        <section className='mt-24'>
          <Reviews></Reviews>
        </section>

        
        <section>
          <FAQ></FAQ>
        </section>
        </>
    );
};

export default Home;