import {RestClient} from './rest_client';
import {CategoryController} from './controllers/categories';
import {AttributeController} from './controllers/attributes';
import {ProductController} from './controllers/products';
import {ProductMediaController} from './controllers/product_media';
import {CategoryProductController} from './controllers/category_products';
import {ConfigurableChildrenController} from './controllers/configurable_children';
import {ConfigurableOptionsController} from './controllers/configurable_options';
import {TaxRateController} from './controllers/tax_rates';
import {TaxRuleController} from './controllers/tax_rules';
import {StockItemController} from './controllers/stock_items';
import {CustomerController} from './controllers/customers';
import {DirectoryController} from './controllers/directory';
import {CartController} from './controllers/cart';
import {OrderController} from './controllers/orders';
import {ReviewController} from './controllers/reviews';
import {StoreController} from './controllers/store';

const MAGENTO_API_VERSION = 'V1';

interface Magento2ClientOptions {
  url: String;
  consumerKey: String;
  consumerSecret: String;
  accessToken: String;
  accessTokenSecret: String;
  version: String
}

export class Magento2Client {
  options: Magento2ClientOptions
  attributes: AttributeController
  categories: CategoryController
  products: ProductController
  productMedia: ProductMediaController
  categoryProducts: CategoryProductController
  configurableChildren: ConfigurableChildrenController
  configurableOptions: ConfigurableOptionsController
  stockItems: StockItemController
  taxRates: TaxRateController
  taxRules: TaxRuleController
  customers: CustomerController
  carts: CartController
  orders: OrderController
  directories: DirectoryController
  reviews: ReviewController
  stores: StoreController

  constructor(options: Magento2ClientOptions) {
    this.options = options;
    this.options.version = MAGENTO_API_VERSION;

    const client = new RestClient(options);

    this.attributes = new AttributeController(client);
    this.categories = new CategoryController(client);
    this.products = new ProductController(client);
    this.productMedia = new ProductMediaController(client);
    this.categoryProducts = new CategoryProductController(client);
    this.configurableChildren = new ConfigurableChildrenController(client);
    this.configurableOptions = new ConfigurableOptionsController(client);
    this.stockItems = new StockItemController(client);
    this.taxRates = new TaxRateController(client);
    this.taxRules = new TaxRuleController(client);
    this.customers = new CustomerController(client);
    this.carts = new CartController(client);
    this.orders = new OrderController(client);
    this.directories = new DirectoryController(client);
    this.reviews = new ReviewController(client);
    this.stores = new StoreController(client);
  }
};
