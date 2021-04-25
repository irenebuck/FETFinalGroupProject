//This program was created collaboratively by Irene, Robbie, and Luis
//If you require certian sections to be "blocked" out, then please give credit to
//Irene for lines 8-40
//Robbie for lines 41-73
//Luis for lines 74-102
//declare class
class Customer {
    constructor(name) {
        this.name = name;
        this.customers = [];
    }
}
//class to handle API and AJAX requests
class CustomerService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/houses';
    static getAllCustomers() {
        return $.get(this.url);
    }
    static getCustomer(id) {
        return $.get(this.url + `/${id}`);
    }
    static createCustomer(customer) {
        return $.post(this.url, customer);
    }
    static updateCustomer(customer) {
        return $.ajax({
            url: this.url + `/${customer._id}`,
            dataType: 'json',
            data: JSON.stringify(customer),
            contentType: 'application/json',
            type: 'PUT'
        })
    }
    static deleteCustomer(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}
//class to handle DOM methods
class DOMManager {
    static customers;
    static getAllCustomers() {//displays content
        CustomerService.getAllCustomers().then(customers => this.render(customers));
    }
    static createCustomer(name) {//makes new entries
        CustomerService.createCustomer(new Customer(name))
        .then(() => {
            return CustomerService.getAllCustomers();
        })
        .then((customer) => this.render(customer));
    }
    static deleteCustomer(id) {//deletes entries
        CustomerService.deleteCustomer(id)
            .then(() => {
                return CustomerService.getAllCustomers();
            })
            .then((customers) => this.render(customers));
    }
    static updateCustomer(id) {//updates entries
        for (let customer of this.customers) {
            if (customer._id === id) {
                customer.name = document.getElementById(`${customer._id}-name`).value;
                CustomerService.updateCustomer(customer)
                    .then(() => {
                        return CustomerService.getAllCustomers();
                    })
                    .then((customer) => this.render(customer));
                }
            }
        }
    static render(customers) {//creates HTML elements that display new Customers
        this.customers = customers;
        $('#app').empty();
        for (let customer of customers) {
            $('#app').prepend(
                `<div id="${customer._id}" class="card">
                <div class="card-header">
                    <h1>Customer Name</h1>
                    <h2>${customer.name}</h2>
                    <input type="text" id="${customer._id}-name" class="form-control" placeholder="Update Name">
                    <button class="btn btn-danger" onclick="DOMManager.deleteCustomer('${customer._id}')">Delete</button>
                    <button id="${customer._id}-button" class="btn btn-success" onclick="DOMManager.updateCustomer('${customer._id}')">Update</button>
                </div>
            </div><br>`
            );
        }
    }
}
$('#create-new-cust').click(() => {//button that creates new entries
    DOMManager.createCustomer($('#new-cust-name').val());
    $('#new-cust-name').val('');
})
DOMManager.getAllCustomers();
