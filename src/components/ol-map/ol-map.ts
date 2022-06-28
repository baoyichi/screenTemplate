import Vue from 'vue';
import Component from 'vue-class-component';
import { TdOlMap } from '@/shared/td-ol-map/td-ol-map';
import { DoubleClickZoom } from 'ol/interaction';
import { transform } from 'ol/proj';
import { Fill, Icon, Style, Text } from 'ol/style';
import { TdOlMapFeatureTypeEnum } from '@/shared/td-ol-map/td-ol-map-feature-type.enum';
import Stroke from 'ol/style/Stroke';

@Component
export default class OlMap extends Vue {
  offsetHeight: string | undefined = `${document.body.offsetHeight + 20}px`;
  offsetWidth: string | undefined = `${document.body.offsetWidth - 37}px`;
  zoom = 4;

  olMap?: TdOlMap;

  mounted(): void {
    this.initOlMap();
  }

  private initOlMap(): void {
    this.olMap = new TdOlMap('tdOlMap', {});
    const dblClickInteraction: any | undefined = this.olMap.map
      ?.getInteractions()
      .getArray()
      .find((interaction: any) => {
        return interaction instanceof DoubleClickZoom;
      });
    this.olMap?.map?.removeInteraction(dblClickInteraction);
    const transformRes = transform([121.498886, 31.237663], 'EPSG:4326', 'EPSG:3857');
    this.olMap?.view?.setCenter(transformRes);
    // 示例
    // this.defaultAddMarker();
  }

  /* private defaultAddMarker(): void {
    // marker
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: require('../../assets/image/map-icon/map-dec.png')
      })
    });
    this.olMap?.addFeature(TdOlMapFeatureTypeEnum.point, [13524759.129548721, 3664134.705615381], iconStyle);

    // polygon
    const polygonStyle = new Style({
      stroke: new Stroke({
        color: 'transparent',
        width: 3
      }),
      fill: new Fill({
        color: 'rgb(106,231,226)'
      }),
      text: new Text({
        text: '火灾',
        scale: 1.5,
        fill: new Fill({
          color: 'white'
        })
      })
    });
    this.olMap?.addFeature(
      TdOlMapFeatureTypeEnum.polygon,
      [
        [
          [13524313.186645636, 3662195.026108176],
          [13524311.459609682, 3662052.956676351],
          [13524384.10688318, 3662052.59565164],
          [13524401.539183846, 3662178.3293520254]
        ]
      ],
      polygonStyle
    );

    // line
    const lineStyle = new Style({
      fill: new Fill({
        color: 'rgba(232,11,18,0.4)'
      }),
      stroke: new Stroke({
        width: 3,
        color: [255, 0, 0, 1]
      })
    });
    this.olMap?.addFeature(
      TdOlMapFeatureTypeEnum.lineString,
      [
        [13525374.48426009, 3661071.506065203],
        [13525290.736343388, 3661050.7165813893],
        [13525183.768658658, 3661098.7645805217]
      ],
      lineStyle
    );

    // circle
    const circleStyle = new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.4)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      })
    });
    this.olMap?.addFeature(TdOlMapFeatureTypeEnum.circle, [13577843.678278774, 3543725.2629851694], circleStyle, 100);
  }*/
}
