import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environment";
import {delay, Observable, of} from "rxjs";
import {Product} from "@core/api/products/products.types";
// @ts-ignore
import {SVDPP} from '../../../../assets/scripts/svd-alghoritm.js'
@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiUrl = `${environment.apiUrl}/products`;

    constructor(private httpClient: HttpClient) {
        let a = new SVDPP(1, 0.001, 0.001);
        // console.log(a)
    }

    public getProducts(): Observable<Product[]> {
        // return this.httpClient.get<Product[]>(`${this.apiUrl}`);
        return of(JSON.parse(localStorage.getItem('products') as string)).pipe(delay(100));
    }

    public getRecommendedProducts(): Observable<Product[]> {
        // return this.httpClient.get<Product[]>(`${this.apiUrl}/recommended`);
        let feedbackMatrix = JSON.parse(localStorage.getItem('feedbacks') as string);

        let feedbackMatrixNum: any = [];
        feedbackMatrix.forEach((row: any) => {
            feedbackMatrixNum.push(row.map((el: any) => parseInt(el, 10)));
        })
        let products = JSON.parse(localStorage.getItem('products') as string);
        let users = JSON.parse(localStorage.getItem('users') as string);
        let currentUser = JSON.parse(localStorage.getItem('user') as string);
        let userIndex = users.map((user: any) => user.uuid).indexOf(currentUser.uuid);

        let svd = new SVDPP(1, 0.001, 0.001);
        svd.train(feedbackMatrixNum);

        let predictions: any = []
        feedbackMatrixNum[userIndex].forEach((productFeedback: any, i:number) => {
            if (productFeedback === 0) {
                console.log('Predicted feedback for user: ', userIndex + 1, ' and product: ', i+1, ' is: ', svd.predict(userIndex, i))
                predictions.push({product: i, prediction: svd.predict(userIndex, i)})
            }
        })

        predictions.sort((a: any, b: any) => b.prediction - a.prediction);
        // console.log(predictions);
        const recommendedProduct = products[predictions[0].product]
        return of([recommendedProduct]).pipe(delay(100))
    }

    public buyProduct(productUuid: string): Observable<Product> {
        // return this.httpClient.post<Product>(`${this.apiUrl}`, {uuid: productUuid});
        return of(JSON.parse(localStorage.getItem('products') as string).find((product: any) => product.uuid === productUuid)).pipe(delay(100));
    }

    public setProductFeedback(request: {uuid: string, mark: number}): Observable<Product> {
        // return this.httpClient.post<Product>(`${this.apiUrl}`, request);
        let feedbacks = localStorage.getItem('feedbacks');

        let products = JSON.parse(localStorage.getItem('products') as string);
        let currentUser = JSON.parse(localStorage.getItem('user') as string);
        let users = JSON.parse(localStorage.getItem('users') as string);
        let productIndex = products.map((product: any) => product.uuid).indexOf(request.uuid);
        let userIndex = users.map((user: any) => user.uuid).indexOf(currentUser.uuid);

        if (feedbacks) {
            let parsedFeedbacks = JSON.parse(feedbacks);
            parsedFeedbacks[userIndex][productIndex] = request.mark;
            localStorage.setItem('feedbacks', JSON.stringify(parsedFeedbacks));
        } else {
            let matrix = [];
            for(let i = 0; i < users.length; i++) {
                matrix[i] = [];
                for(let j = 0; j < products.length; j++) {
                    // @ts-ignore
                    matrix[i][j] = 0;
                }
            }
            // @ts-ignore
            matrix[userIndex][productIndex] = request.mark;
            localStorage.setItem('feedbacks', JSON.stringify(matrix));
        }
        return of(products[productIndex]).pipe(delay(100));
    }
}
