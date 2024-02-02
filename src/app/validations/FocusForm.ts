
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FocusForm {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
      this.renderer = rendererFactory.createRenderer(null, null);
  }

// constructor(private renderer: Renderer2) {}

 focusInvalidForm(fromToCheck: any) {
    var firstError:any = null;
    const controls = fromToCheck.controls;
    for (const name in controls) {
      if (controls[name].valid == false) {
        firstError = name;
      }

      if (firstError != null) {
        let textarea = document.getElementById(firstError)?.focus();
        return;
      }
    }
  }
}
