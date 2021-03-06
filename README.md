# expo-stripe-purchase

[GitHub Repo](https://github.com/bthomas16/expo-stripe-purchase)

[NPM Registry](https://www.npmjs.com/package/expo-stripe-purchase)

Make purchases directly in your app without ejecting from the Expo Managed Workflow. Avoid all the bugs of other webview solutions, this repo is the product of spending hours fixing other, deprecated solutions.

Return a simple token from the Stripe API on succesfull checkouts.

This repo would not be possible without the hard work of [this repo](https://github.com/briansztamfater/expo-stripe-checkout).

# Important Usage

1. This component works best when returned as the primary component / view. Do not try to nest it within other components.
2. Do not pass decimals into the component. Instead, pass numbers with the hundreth's place included.
3. This is intended to be used as a full screen checkout page, if that is not your intended usage - you may need to clone this repo and fiddle with the webview yourself (webviews are difficult to use like this in my experience, please show me I am wrong)

# Props

| Props        | Type  | Description  | Required |
| :------------- |:------:| :-------- | -------- |
| publicKey   | string | Api Key to connect to Stripe (i.e. pk_kjfsdg_shffdg)       | true |
| storeName   | string | Store name to display        | true |
| description | string |   Description of the purchase being made       | true |
| imageUrl    | string |    Store image url to display      | true |
| amount    | number |    Amount to charge       | true |
| currency    | string |    Type of currency to be used       | true |
| allowRememberMe    | boolean |    Allow for easier future checkouts        | true |
| email    | string |    Pre-populated email address     | true |
| style    | object |    Style the webview, not the inner-components (i.e. cannot style the button / colors)       | false |
| onClose    | function |    Called when webview is closed        | true |
| onPaymentSuccess    | function |    Called after successfull payment made (token: string) =>        | true |


# Example

![Checkout Webview Demo](https://raw.githubusercontent.com/briansztamfater/expo-stripe-checkout/HEAD/expo-stripe-checkout-demo.gif)

```
import ExpoStripePurchase from 'expo-stripe-purchase';

onClose = () => {
    // handle close (i.e. navigate back)
}

onPaymentSuccess = (token: string) => {
    // handle saving token on backend
    // will automatically call 'onClose'
}

render () {
    return (
        <ExpoStripePurchase
            publicKey="FILL IN WITH YOUR DATA"
            amount={100000}
            imageUrl="www.clever-image-url.com"
            storeName="Clever Store Name"
            description="Clever product description."
            currency="USD"
            allowRememberMe={true}
            prepopulatedEmail="clever_email@clever.com"
            onClose={this.onClose}
            onPaymentSuccess={(token: string) => this.onPaymentSuccess(token)}
            style={{width: 1000, alignSelf: 'center'}}
        />
    )
}
```


For more information please see the [Stripe Docs](https://stripe.com/docs/payments/checkout)
