export interface ICountry {
    alpha3Code?: string;
    name?: string;
    region?: string;
    flag?: string;
    population?: number;
    capital?: string;
    currencies?: [{
        name: string;
    }];
}