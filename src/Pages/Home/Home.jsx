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
        <section className=''>
        <Banner></Banner>
        </section>
        <section className='py-24'>
          <div>
            <h1 className='text-7xl text-center py-5 mb-8'>Map </h1>
          </div>
          <MapView></MapView>
        </section>
        {/* top rated rooms */}
        <section>

      <TopRoom></TopRoom>

        </section>

        <section>
          <Reviews></Reviews>
        </section>

        <section>
          <Newsletter></Newsletter>
        </section>
        <section>
          <FAQ></FAQ>
        </section>
        </>
    );
};

export default Home;