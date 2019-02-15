import { ContextObjects, ContextObject, Crm, Filters } from 'coveofordynamics-search-ui';
import {
  Component,
  ComponentOptions,
  IComponentBindings,
  $$,
  QueryEvents,
  IBuildingQueryEventArgs,
  Initialization
} from 'coveo-search-ui';
import { IODataCollection } from 'coveo-odata';

interface IAccount {
  name: string;
}

export interface IHelloWorldOptions {
  dummyOptionText: string;
  dummyOptionQuery: string;
}

export class HelloWorld extends Component {
  static ID = 'HelloWorld';

  static options: IHelloWorldOptions = {
    dummyOptionText: ComponentOptions.buildStringOption({
      defaultValue: 'Hello world'
    }),
    dummyOptionQuery: ComponentOptions.buildStringOption({
      defaultValue: '@uri'
    })
  };

  constructor(public element: HTMLElement, public options: IHelloWorldOptions, public bindings: IComponentBindings) {
    super(element, HelloWorld.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(element, HelloWorld, options);

    $$(this.element).text(this.options.dummyOptionText);
    $$(this.element).on('click', () => {
      Xrm.Navigation.openAlertDialog({
        text: this.options.dummyOptionText,
        confirmButtonLabel: 'Close'
      });
    });

    this.bind.onRootElement(QueryEvents.buildingQuery, (args: IBuildingQueryEventArgs) => this.handleBuildingQuery(args));

    this.registerContextObject();
    this.registerLiquidFilter();
  }

  private registerContextObject() {
    const request = Crm.WebApi.init().resource('accounts').top(1).get();
    request.build<IODataCollection<IAccount>>()
        .then(accounts => accounts.value.forEach(account => {
          console.log(account.name);
          ContextObjects.register('helloaccount', new ContextObject({
            'hello': account.name
          }));
        }));
  }

  private registerLiquidFilter() {
    Filters.registerFilter('addhelloworld', (value: string) => `${value} Hello World`);
  }

  private handleBuildingQuery(args: IBuildingQueryEventArgs) {
    args.queryBuilder.advancedExpression.add(this.options.dummyOptionQuery);
  }
}

Initialization.registerAutoCreateComponent(HelloWorld);
