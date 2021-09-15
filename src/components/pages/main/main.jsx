import React from 'react';
import Header from '../../header/header';
import Slider from '../../slider/slider';
import Tabs from '../../tabs/tabs';

export default function Main() {
  return (
    <>
      <Header/>
      <main>
        <Slider/>
        <Tabs/>
      </main>
    </>
  );
}
