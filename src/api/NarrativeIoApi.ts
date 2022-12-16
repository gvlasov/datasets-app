import Dataset from "./data/Dataset";
import Country from "./data/Country";
import BuyOrder from "./data/BuyOrder";

export default class NarrativeIoApi {
    private baseUrl: string = 'https://63923232ac688bbe4c5e9be4.mockapi.io/maritime/'

    public async getDatasets(): Promise<Dataset[]> {
        return this.get('datasets').then(
            response => response.json()
                .then(json => json.map((item: any) => item as Dataset))
        )
    }

    public async getCountries(): Promise<Country[]> {
        return this.get('countries').then(
            response => response.json()
                .then(items => items.map((item: any) => item as Country))
        )
    }

    public async getBuyOrders(): Promise<BuyOrder[]> {
        return this.get('buy-orders').then(
            response => response.json()
                .then(items => items.map((item: any) => item as BuyOrder))
        )
    }

    public async getBuyOrderById(id: number): Promise<BuyOrder> {
        return this.get(`buy-orders/${id}`).then(
            response => response.json()
                .then(item => item as BuyOrder)
        )
    }

    public async createBuyOrder(buyOrder: BuyOrder): Promise<BuyOrder> {
        return this.post('buy-orders', buyOrder)
            .then(async response => (await response.json()) as BuyOrder)
    }

    public async updateBuyOrder(buyOrder: BuyOrder): Promise<BuyOrder> {
        if (typeof buyOrder.id === 'undefined') {
            throw new Error("Buy order doesn't have an id")
        }
        return await this.put(`buy-orders/${buyOrder!.id}`, buyOrder)
            .then(async response => (await response.json()) as BuyOrder)
    }

    public async deleteBuyOrder(buyOrder: BuyOrder): Promise<void> {
        if (typeof buyOrder.id === 'undefined') {
            throw new Error("Buy order doesn't have an id")
        }
        return this.delete(`buy-orders/${buyOrder!.id}`)
            .then(response => void 0)
    }

    protected async post(
        endpoint: string,
        payload: object
    ): Promise<Response> {
        return fetch(this.baseUrl + endpoint,
            {
                method: 'POST',
                body: JSON.stringify(payload),
            }
        )
    }

    protected async put(
        endpoint: string,
        payload: object
    ): Promise<Response> {
        return fetch(this.baseUrl + endpoint,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
            }
        )
    }

    protected async get(
        endpoint: string
    ): Promise<Response> {
        return fetch(this.baseUrl + endpoint, {
            method: 'GET'
        })
    }

    protected async delete(
        endpoint: string
    ): Promise<Response> {
        return fetch(this.baseUrl + endpoint, {
            method: 'DELETE'
        })
    }
}