import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CardHeaderComponent } from "./commons/components/card-header/card-header.component";
import { filter, map, Subscription } from 'rxjs';
import { MenuBarComponent } from './commons/components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Barbearia Dio Avanade';
  private routeSuscription?:Subscription;

  constructor(
    private readonly router: Router,
    private readonly activateRouter : ActivatedRoute
  ){}

  ngOnDestroy(): void {
    if(this.routeSuscription){
      this.routeSuscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.routeSuscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getTituloRoute(this.activateRouter))
    ).subscribe(title => this.title = title)
  }

  private getTituloRoute(route: ActivatedRoute): string {
    let titulo = route;
    while (titulo.firstChild) {
      titulo = titulo.firstChild;
    }
    return titulo.snapshot.data['title'] || 'Default Title';
  }


}

