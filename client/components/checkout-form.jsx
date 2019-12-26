import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardHolder: '',
      card: '',
      expiration: '',
      cvv: '',
      checkValidity: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
        address2: true,
        city: true,
        state: true,
        zip: true,
        cardHolder: true,
        card: true,
        expiration: true,
        cvv: true,
        acknowledgement: true
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const checkValidity = {
      fullName: true,
      email: true,
      phone: true,
      address: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      cardHolder: true,
      card: true,
      expiration: true,
      cvv: true,
      acknowledgement: true
    };

    const numRegex = RegExp(/^[0-9]*$/);
    const zipRegex = RegExp(/^[0-9]*-*[0-9]*$/);
    const expRegex = RegExp(/^[0-9]*\/*[0-9]*$/);

    switch (event.target.name) {
      case 'phone':
      case 'card':
      case 'cvv':
        if (numRegex.test(event.target.value)) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      case 'zip':
        if (zipRegex.test(event.target.value)) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      case 'expiration':
        if (expRegex.test(event.target.value)) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
        break;
    }

    this.setState({ checkValidity });
  }

  handleSubmit(event) {
    event.preventDefault();

    const checkValidity = {
      fullName: true,
      email: true,
      phone: true,
      address: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      cardHolder: true,
      card: true,
      expiration: true,
      cvv: true,
      acknowledgement: true
    };

    const emailRegex = RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const zipRegex = RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
    const expRegex = RegExp(/^(0[1-9]|1[0-2])\/[0-9]{4}$/);

    if (this.state.fullName.length < 5) {
      checkValidity.fullName = false;
    }

    if (!emailRegex.test(this.state.email)) {
      checkValidity.email = false;
    }

    if (this.state.phone.length < 10) {
      checkValidity.phone = false;
    }

    if (this.state.state === 'Choose State...') {
      checkValidity.state = false;
    }

    if (!zipRegex.test(this.state.zip)) {
      checkValidity.zip = false;
    }

    if (this.state.card.length < 16) {
      checkValidity.card = false;
    }

    if (!expRegex.test(this.state.expiration)) {
      checkValidity.expiration = false;
    }

    if (this.state.cvv.length < 3) {
      checkValidity.cvv = false;
    }

    if (this.state.acknowledgement === false) {
      checkValidity.acknowledgement = false;
    }

    if (Object.values(checkValidity).find(element => element === false) === undefined) {
      const placeOrder = {
        fullName: this.state.fullName,
        email: this.state.email,
        phone: this.state.phone,
        address: `${this.state.address} \n${this.state.address2} \n${this.state.city}, ${this.state.state} ${this.state.zip}`,
        cardHolder: this.state.cardHolder,
        card: this.state.card.split(' ').join().split('-').join(),
        expiration: this.state.expiration,
        cvv: this.state.cvv
      };
      this.props.checkout({ placeOrder });
    } else {
      this.setState({ checkValidity });
    }

  }

  render() {
    const viewCatalog = this.props.viewData;
    const cart = this.props.priceInfo;
    let totalPrice = 0;
    cart.forEach(product => {
      totalPrice = totalPrice + (product.price * product.quantity);
    });
    // const total = '$' + ((totalPrice / 100).toFixed(2));
    return (
      <div className="container col-12 col-sm-10 col-md-8 col-lg-8 my-5">
        <div className="d-flex flex-wrap m-3">
          <form className="col-12" onSubmit={this.handleSubmit}>
            <h3 className="mb-3">Billing/Shipping</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" minLength="5" maxLength="65" className="form-control" id="fullName" value={this.state.fullName} name='fullName' onChange={this.handleChange} required />
              <div className="invalid-feedback">Must be at least 5 characters.</div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input type="email" minLength="6" maxLength="254" className="form-control" id="email" value={this.state.email} name='email' onChange={this.handleChange} required />
                <div className="invalid-feedback">Please enter a valid email.</div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" minLength="10" maxLength="11" className="form-control" id="phone" value={this.state.phone} name='phone' onChange={this.handleChange} placeholder="1234567890" required />
                <div className="invalid-feedback">Please enter a valid phone number.</div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" minLength="6" maxLength="42" className="form-control" id="address" value={this.state.address} name="address" placeholder="1234 Main St." onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address 2</label>
              <input type="text" maxLength="42" className="form-control" id="address2" value={this.state.address2} name="address2" placeholder="Apartment, Studio, or Floor" onChange={this.handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="city">City</label>
                <input type="text" minLength="3" maxLength="50" className="form-control" id="city" value={this.state.city} name="city" onChange={this.handleChange} required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="state">State</label>
                <select id="state" className="form-control" value={this.state.state} name="state" onChange={this.handleChange} required >
                  <option defaultValue >Choose State...</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="zip">Zip</label>
                <input type="text" minLength="5" maxLength="10" className="form-control" id="zip" value={this.state.zip} name="zip" onChange={this.handleChange} required />
                <div className="invalid-feedback">Please enter a valid zip code.</div>
              </div>
            </div>
            <hr className="my-4" />
            <h3 className="mb-3">Payment</h3>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="cardHolder">Name on Card</label>
                <input type="text" minLength="5" maxLength="65" className="form-control" id="cardHolder" value={this.state.cardHolder} name="cardHolder" onChange={this.handleChange} required />
                <div className="invalid-feedback">Must be at least 5 characters.</div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" minLength="16" maxLength="16" className="form-control" id="cardNumber" value={this.state.card} name="card" placeholder="0000 0000 0000 0000" onChange={this.handleChange} required />
                <div className="invalid-feedback">Please enter a valid card number.</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="expiration">Expiration</label>
                <div className="invalid-feedback">Please enter a valid expiration date.</div>
                <input type="text" minLength="7" maxLength="7" className="form-control" id="expiration" value={this.state.expiration} name="expiration" placeholder="MM/YYYY" onChange={this.handleChange} required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="cvv">CVV</label>
                <input type="text" minLength="3" maxLength="4" className="form-control" id="cvv" value={this.state.cvv} name="cvv" placeholder="###" onChange={this.handleChange} required />
                <div className="invalid-feedback">Please enter a valid CVV.</div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="acknowledgement" required />
              <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that this is a demo application, and the information above is not my genuine financial or personal information.</label>
            </div>
            <hr className="my-4" />
            <button type="submit" className="btn btn-primary align-self-end">Submit</button>
          </form>
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center my-3">
              <div className="back text-muted" onClick={() => viewCatalog('catalog', {})}>
                {'< Continue Shopping'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
