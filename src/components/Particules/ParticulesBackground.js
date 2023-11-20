"use client"
import React ,{useCallback} from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import particulesConfig from './particules-config'

function ParticulesBackground() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
  return (
   <Particles 
   id="tsparticules"
   particlesLoaded="particlesLoaded"
   init={particlesInit}
   loaded={particlesLoaded}
   height='100vh'
   width='100vw'
   options={particulesConfig} > 
 
   </Particles>
  )
}

export default ParticulesBackground