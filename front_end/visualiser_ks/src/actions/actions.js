
// This domain name.
const DOMAIN = window.location.href;
//const DOMAIN = 'http://localhost:8000/';


// Class to create HTTP Request and make calls to API
class RequestOptions {
    constructor(method = "GET", csrftoken = null, body = null) {
        this.className = 'RequestOptions';
        this.purpose = "Create the options to pass into the fetch() API";
        this.method = method;
        this.httpHeader = new Headers();
        this.httpHeader.append('Content-type', 'application/json');
        this.httpHeader.append('Accept', 'application/json');

        if (csrftoken !== null) {
            this.httpHeader.append('X-CSRFtoken', csrftoken);
        }
        this.payload = body;
    }
    get options() {
        if (this.payload !== null) {
            return ({
                method: this.method,
                headers: this.httpHeader,
                body: JSON.stringify(this.payload),
            });
        } else {
            return ({
                method: this.method,
                headers: this.httpHeader,
            });
        }
    }
    static create(method = "GET", csrftoken = null, body = null) {
        return new RequestOptions(method, csrftoken, body);
    }
    call(fullDomain) {
        const jsonRes = fetch(fullDomain, this.options)
            .then(response => {
                return response.json();
            }).then(data => {
                return data
            }).catch(error => {
                return { status: 404 };
            })
        return jsonRes;
    }
};

const APIActions = {

    sendFile: (rawFormData) => {
        const formData = new FormData(rawFormData);
        let _file = formData.get('fileUpload');
        const reader = new FileReader();
        reader.readAsText(_file)
        reader.addEventListener('load', async (event) => {
            const payload = {
                payload: event.target.result,
            };
            const driver = RequestOptions.create('POST', null, payload);
            const jsonResponse = await driver.call(`${DOMAIN}api/ingest/`);
            if (jsonResponse.success == true) {
                alert('Data Successfully Ingested');
            } else {
                alert('Error During Data Ingestion');
            }
        });
    },

    getProteinDetails: async (rawFormData) => {
        const formData = new FormData(rawFormData);
        const proteinID = formData.get('proteinID');
        const driver = RequestOptions.create();
        const jsonResp = await driver.call(`${DOMAIN}api/protein-details/${proteinID}/`);
        return jsonResp;
    },
    getProteinAbundance: async (rawFormData) => {
        const formData = new FormData(rawFormData);
        const proteinID = formData.get('proteinID');
        const driver = RequestOptions.create();
        const jsonResp = await driver.call(`${DOMAIN}api/protein-abundance/${proteinID}/`);
        return jsonResp;
    }
};

export default APIActions;