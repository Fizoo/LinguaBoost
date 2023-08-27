import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Directive({
  selector: '[appDynamicRouterLinkActive]'
})
export class DynamicRouterLinkActiveDirective implements OnInit {
  @Input() appDynamicRouterLinkActive: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private r2: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.extracted()
  }

  private extracted() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {
        const currentUrl = this.router.url
        const currentUrl2 = this.router.url.split('?')[1]
        const isActive = currentUrl.startsWith(`/${this.appDynamicRouterLinkActive}`);
        let queryP = currentUrl2 ? currentUrl2.split('=')[1] : null

        if (isActive) {
          if (this.appDynamicRouterLinkActive === 'theme') {
            this.r2.addClass(this.el.nativeElement, 'active');
          } else if (this.appDynamicRouterLinkActive === 'phrases' && queryP === 'phrase') {
            this.r2.addClass(this.el.nativeElement, 'active');
          } else if (this.appDynamicRouterLinkActive === 'phrases' && queryP === 'sentence') {
            this.r2.addClass(this.el.nativeElement, 'active');
          } else {
            this.r2.removeClass(this.el.nativeElement, 'active');
          }
        } else {
          this.r2.removeClass(this.el.nativeElement, 'active');
        }
      })
  }
}
