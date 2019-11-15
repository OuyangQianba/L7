import { Scene } from '@l7/scene';
import { Point3dLayer} from '@l7/layers'

const scene = new Scene({
  id: 'map',
  pitch: 35.210526315789465,
  type: 'amap',
  style: 'light',
  center: [108.524505, 29.873128],
  zoom: 4.4,

});
window.mapScene = scene;
fetch('https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json')
  .then((res) => res.json())
  .then((data) => {
    const pointLayer =
      new Point3dLayer({
      })
        .source(data.list, {
          parser: {
            type: 'json',
            x: 'j',
            y: 'w'
          }
        }) 
        .shape('cylinder')
        .size('t', function(level) {
          return [1, 2, level * 2 + 20];
        })
        .color('#006CFF')
        .style({
          opacity: 1.0,
        })
        scene.addLayer(pointLayer);
        console.log(pointLayer);
       
  });