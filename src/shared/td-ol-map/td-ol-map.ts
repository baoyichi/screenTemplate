import { MapProjEnum } from './map-proj.enum';
import { defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';
import Tile from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { MapOptions } from 'ol/PluggableMap';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import View from 'ol/View';
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw';
import Polygon from 'ol/geom/Polygon';
import { Coordinate } from 'ol/coordinate';
import { AppCustomOverlay } from '@/shared/td-ol-map/app-custom-overlay';
import Feature, { FeatureLike } from 'ol/Feature';
import Style from 'ol/style/Style';
import { TdOlMapFeatureTypeEnum } from '@/shared/td-ol-map/td-ol-map-feature-type.enum';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import LineString from 'ol/geom/LineString';
import BaseLayer from 'ol/layer/Base';

export class TdOlMap {
  view?: View;
  map?: Map;
  extent: number[] = [];
  private tk = 'ee2cf0327c73ccdf87b4bf7f8110a645';
  private defaultLayerId = 'paintLayer';
  private draw?: Draw;

  // 天地图路网
  private roadLayer = new Tile({
    source: new XYZ({
      url: `http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${this.tk}`
    })
  });

  // 天地图注记
  private annotation = new Tile({
    source: new XYZ({
      url: `http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${this.tk}`
    })
  });

  // 天地图影像
  private satelliteLayer = new Tile({
    source: new XYZ({
      url: `http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${this.tk}`
    })
  });
  // 行政区域
  private administrativeDivision = new Tile({
    source: new XYZ({
      url: `http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${this.tk}`
    })
  });

  constructor(containerId: string, options: MapOptions) {
    this.extent = [-33554432.0, -33554432.0, 33554432.0, 33554432.0];
    const mapMinZoom = 12;
    const mapMaxZoom = 19;
    const mapResolution = [];
    for (let i = 0; i <= mapMaxZoom; i++) {
      mapResolution.push(262144.0 / Math.pow(2, i));
    }
    const mapTileGrid = new TileGrid({
      extent: this.extent,
      minZoom: mapMinZoom,
      origin: getCenter(this.extent),
      resolutions: mapResolution
    });

    this.view = new View({
      center: [13576364.46, 3544346.55],
      zoom: 16,
      rotation: -(Math.PI / 6.5)
    });

    const paintLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });
    (paintLayer as any).id = this.defaultLayerId;

    let config = {
      logo: false,
      controls: defaultControls({ attribution: false, zoom: false, rotate: false }).extend([]),
      target: containerId,
      layers: [this.roadLayer, this.annotation, paintLayer],
      view: this.view
    };

    if (options) {
      config = Object.assign(config, options);
    }
    this.map = new Map(config);
    this.initMapClickEvent();
  }

  addInteraction(selectItem: string): any {
    if (!this.map) {
      return;
    }
    if (selectItem !== 'None') {
      let geometryFunc;
      if (selectItem === 'Square') {
        selectItem = 'Circle';
        geometryFunc = createRegularPolygon(4);
      } else if (selectItem === 'Box') {
        selectItem = 'Circle';
        geometryFunc = createBox();
      } else if (selectItem === 'Star') {
        selectItem = 'Circle';
        geometryFunc = (coordinates: any, geometry: any) => {
          const center = coordinates[0];
          const last = coordinates[coordinates.length - 1];
          const dx = center[0] - last[0];
          const dy = center[1] - last[1];
          const radius = Math.sqrt(dx * dx + dy * dy);
          const rotation = Math.atan2(dy, dx);
          const newCoordinates = [];
          const numPoints = 12;
          for (let i = 0; i < numPoints; ++i) {
            const angle = rotation + (i * 2 * Math.PI) / numPoints;
            const fraction = i % 2 === 0 ? 1 : 0.5;
            const offsetX = radius * fraction * Math.cos(angle);
            const offsetY = radius * fraction * Math.sin(angle);
            newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
          }
          newCoordinates.push(newCoordinates[0].slice());
          if (!geometry) {
            geometry = new Polygon([newCoordinates]);
          } else {
            geometry.setCoordinates([newCoordinates]);
          }

          return geometry;
        };
      }
      const targetLayer = this.getTargetLayerById();
      const targetSource = targetLayer!.get('source') as VectorSource<any>;
      this.draw = new Draw({
        source: targetSource,
        type: selectItem,
        geometryFunction: geometryFunc
      });
      // this.map!.addLayer(vector);
      this.map!.addInteraction(this.draw);
    }
  }

  showOverLay(pos: Coordinate, divElement: HTMLDivElement): void {
    const popUp = new AppCustomOverlay({
      element: divElement
    });

    popUp.extData = { isActive: false };
    popUp.setPosition(pos);
    this.map!.addOverlay(popUp);
  }

  initMapClickEvent(): void {
    this.map?.on('click', (event: any) => {
      console.log(event.coordinate);
      const targetFeature = this.map!.forEachFeatureAtPixel(event.pixel, (feature: FeatureLike) => {
        console.log(feature);
      });
    });
  }

  resetZoom(zoom: number): void {
    this.map!.set('zoom', zoom);
  }

  removeFeature(feature: Feature<any>): void {
    const targetLayer = this.getTargetLayerById();
    const targetSource = targetLayer!.get('source') as VectorSource<any>;
    targetSource.removeFeature(feature);
  }

  addFeature(
    geometryType: string,
    coordinate: number[] | number[][] | number[][][],
    style: Style,
    radius?: number,
    extData?: any
  ): void {
    const targetLayer = this.getTargetLayerById();
    if (!targetLayer) {
      return;
    }
    let targetGeometry;
    switch (geometryType) {
      case TdOlMapFeatureTypeEnum.point:
        targetGeometry = new Point(coordinate as number[]);
        break;
      case TdOlMapFeatureTypeEnum.lineString:
        targetGeometry = new LineString(coordinate as number[][]);
        break;
      case TdOlMapFeatureTypeEnum.polygon:
        targetGeometry = new Polygon(coordinate as number[][][]);
        break;
      case TdOlMapFeatureTypeEnum.circle:
        targetGeometry = new Circle(coordinate as number[], radius);
        break;
      default:
    }
    if (!targetGeometry) {
      return;
    }
    const targetSource = targetLayer.get('source') as VectorSource<any>;
    const feature = this.createFeature(targetGeometry, style, extData);
    targetSource.addFeature(feature);
  }

  createFeature(targetGeometry: Point | LineString | Polygon | Circle, style: Style, extData: {}): Feature<any> {
    const feature = new Feature({
      geometry: targetGeometry
    });
    (feature as any).extdata = extData;
    feature.setStyle(style);

    return feature;
  }

  getTargetLayerById(): BaseLayer | null {
    const layers = this.map!.getLayers();
    const layersArr = layers.getArray();
    const res = layersArr.find((layerItem: any) => layerItem.id === this.defaultLayerId);

    return res || null;
  }
}
