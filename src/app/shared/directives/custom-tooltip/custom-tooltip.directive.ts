import { ComponentRef, Directive, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';
import { CustomTooltipComponent } from '../../components/custom-tooltip/custom-tooltip.component';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appCustomTooltip]'
})
export class CustomTooltipDirective {

  @Input() showToolTip: boolean = true;

  @Input('customToolTip') text: string = '';

  @Input() contentTemplate: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  
  constructor(private _overlay: Overlay,
              private _overlayPositionBuilder: OverlayPositionBuilder,
              private _elementRef: ElementRef) { }

  ngOnInit() {

    if (!this.showToolTip) {
      return;
    }

    const positionStrategy = this._overlayPositionBuilder
                                 .flexibleConnectedTo(this._elementRef)
                                 .withPositions([{
                                                    originX: 'end',
                                                    originY: 'bottom',
                                                    overlayX: 'start',
                                                    overlayY: 'top',
                                                    offsetY: 5,
                                                }]);

    this._overlayRef = this._overlay.create({ positionStrategy});

  }

  @HostListener('mouseenter')
  show() {
    if (this._overlayRef && !this._overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<CustomTooltipComponent> = this._overlayRef.attach(new ComponentPortal(CustomTooltipComponent));
      tooltipRef.instance.text = this.text;
      tooltipRef.instance.contentTemplate = this.contentTemplate;
    }    
  }

  @HostListener('mouseleave')
  hide() {
    this.closeToolTip();
  }

  ngOnDestroy() {
    this.closeToolTip();
  }

  private closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

}
