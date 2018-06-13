import {
  Component,
  ComponentOptions,
  $$,
  Initialization,
  IResultsComponentBindings,
  IQueryResult,
  SVGIcons
} from 'coveo-search-ui';

export interface IResultActionOptions {
  dummyOptionText: string;
}

export class ResultAction extends Component {
  static ID = 'ResultActionStarter';

  static options: IResultActionOptions = {
    dummyOptionText: ComponentOptions.buildStringOption({
      defaultValue: 'Hello world'
    })
  };

  public constructor(public element: HTMLElement, public options: IResultActionOptions, public bindings?: IResultsComponentBindings, public result?: IQueryResult) {
    super(element, ResultAction.ID, bindings);

    this.options = ComponentOptions.initComponentOptions(element, ResultAction, options);

    this.render();
    $$(this.element).on('click', () => this.onClick());
  }

  public onClick() {
    Xrm.Navigation.openAlertDialog({
      text: this.options.dummyOptionText,
      confirmButtonLabel: 'Close'
    });
  }

  private render() {
    const icon = $$('div', { className: 'coveo-icon' }, '<svg height="20" width="20"><circle cx="10" cy="10" r="6" stroke="black" stroke-width="1" fill="blue" /></svg>');

    $$(this.element).append(icon.el);
  }
}

Initialization.registerAutoCreateComponent(ResultAction);
