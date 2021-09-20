import React from 'react';
import Header from '../../header/header';
import Slider from '../../slider/slider';
import Tabs from '../../tabs/tabs';
import Calculator from '../../calculator/calculator';
import Map from '../../map/map';
import Footer from '../../footer/footer';

export default function Main() {
  return (
    <>
      <Header/>
      <main>
        <Slider/>
        <Tabs/>
        <Calculator/>
        <Map/>
      </main>
      <Footer/>
    </>
  );
}
