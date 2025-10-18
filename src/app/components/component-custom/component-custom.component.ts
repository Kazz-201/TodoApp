import { Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-component-custom',
  templateUrl: './component-custom.component.html',
  styleUrls: ['./component-custom.component.scss'],
  standalone: true
})
export class ComponentCustomComponent implements OnInit, OnChanges, OnDestroy {
  @Input() variable!: boolean;

  constructor() {
    console.log('Desde el consolelog');
  }

  ngOnInit(): void {
    console.log('Desde el ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variable']) {
      console.log('Valor: ', changes['variable'].currentValue);
    }
  }
  ngOnDestroy(): void {
    console.log('Componente destruido');
  }
}
