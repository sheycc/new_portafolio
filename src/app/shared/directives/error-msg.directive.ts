import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errorMsg]'
})
export class ErrorMsgDirective implements OnInit{

  htmlElement!: ElementRef;
  private  _color: string = '#fa1c01';
  private  _msg: string = 'Required field';

  @Input() set color(value: string) {
    this._color = value;
    this.setColor();
  };
  @Input() set msg(value: string) {
    this._msg = value;
    this.setMsg();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.color = this._color;
    this.msg = this._msg;
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMsg(): void {
    this.htmlElement.nativeElement.textContent = this._msg; //or innerHTML
  }

}
