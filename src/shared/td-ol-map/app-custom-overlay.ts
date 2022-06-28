import Overlay from 'ol/Overlay';

export class AppCustomOverlay extends Overlay {
  extData?: { isActive: boolean };
}
