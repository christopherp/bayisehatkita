import csv, json
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from io import BytesIO
import base64


class Prediction:
    def __init__(self):
        self.beratBadan = pd.read_csv('datas/BB.csv', usecols=['Umur','BB'])
        self.tinggiBadan = pd.read_csv('datas/TB.csv', usecols=['Umur','TB'])
        self.LinearRegression = LinearRegression()
        self.standartd = pd.read_csv('datas/standart.csv',usecols=['Umur','-2 SD','-1 SD','Median', 'JenisKelamin', 'Type'])

    # Prediksi Umur berdasarkan Tinggi Badan
    def getByHeight(self, **kwargs):
        age = kwargs.get('age')
        jenisKelamin = kwargs.get('jenisKelamin')
        tinggiBadan = kwargs.get('tinggiBadan')
        rangeAge = kwargs.get('rangeAge')

        if tinggiBadan:
            self.tinggiBadan = pd.read_json(tinggiBadan)
        
        x = self.tinggiBadan['Umur'].values.reshape(-1,1)
        y = self.tinggiBadan['TB'].values.reshape(-1,1)

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.20, random_state=0)

        self.LinearRegression.fit(x_train,y_train)

        finalAge=[np.array([age])]

        y_predTest=self.LinearRegression.predict(x_test)
        y_predFinal=self.LinearRegression.predict(finalAge)
        
        result=(y_predFinal[0])

        results = dict()
        results['name']= 'height'
        results['age'] = age
        results['result'] = result[0]
        results['range'] = rangeAge

        filterRangeAge = (self.standartd['Umur'] <= rangeAge) & (self.standartd['Umur'] >= 0)
        if rangeAge == 60:
            filterRangeAge = (self.standartd['Umur'] <= rangeAge) & (self.standartd['Umur'] >= 24)

        if jenisKelamin == 'laki-laki':
            standardFilter = (self.standartd['JenisKelamin'] == 'male') & (self.standartd['Type'] == 'height') & filterRangeAge
        else:
            standardFilter = (self.standartd['JenisKelamin'] == 'female') & (self.standartd['Type'] == 'height') & filterRangeAge

        standardFilterHeight = self.standartd.loc[standardFilter]

        Age =  standardFilterHeight['Umur'].values.reshape(-1,1)
        minTwoSD = standardFilterHeight['-2 SD'].values.reshape(-1,1)
        minOneSD = standardFilterHeight['-1 SD'].values.reshape(-1,1)
        median = standardFilterHeight['Median'].values.reshape(-1,1)

        resultPointX = list()
        resultPointX.extend(x)
        resultPointX.extend([age])

        resultPointY = list()
        resultPointY.extend(y)
        resultPointY.extend([result[0]])

        plt.figure(figsize=(20,10))
        plt.plot(x,y, color='blue', marker='o', label="Tinggi Badan Anak")
        plt.plot(Age,median, color='green', label="Median")
        plt.plot(Age,minOneSD, color='orange', label="-1 SD")
        plt.plot(Age,minTwoSD, color='red', label="-2 SD")
        plt.plot(resultPointX, resultPointY, color="blue", marker='o', label="Result")
        plt.title('Tinggi Badan Anak vs Umur', fontsize=14)
        plt.xlabel('Umur (bulan)', fontsize=14)
        plt.ylabel('Tinggi Badan (cm)', fontsize=14)
        plt.grid(True)
        plt.legend()

        height = BytesIO()
        plt.savefig(height, format="png")
        data = base64.b64encode(height.getbuffer())
        results['base64'] = data.decode("UTF-8")

        # plt.show()

        return results

    # Prediksi Umur berdasarkan Berat Badan
    def getByWeight(self, **kwargs):
        age = kwargs.get('age')
        jenisKelamin = kwargs.get('jenisKelamin')
        beratBadan = kwargs.get('beratBadan')
        rangeAge = kwargs.get('rangeAge')

        if beratBadan:
            self.beratBadan = pd.read_json(beratBadan)
        a = self.beratBadan['Umur'].values.reshape(-1,1)
        b = self.beratBadan['BB'].values.reshape(-1,1)

        a_train, a_test, b_train, b_test = train_test_split(a, b, test_size=0.5, random_state=0)

        self.LinearRegression.fit(a_train,b_train)
        
        finalAge=[np.array([age])]
        
        b_predTest=self.LinearRegression.predict(a_test)
        b_predFinal=self.LinearRegression.predict(finalAge)
        
        result=(b_predFinal[0])

        results = dict()
        results['name']= 'weight'
        results['age'] = age
        results['result'] = result[0]
        results['range'] = rangeAge

        filterRangeAge = (self.standartd['Umur'] <= rangeAge) & (self.standartd['Umur'] >= 0)
        if rangeAge == 60:
            filterRangeAge = (self.standartd['Umur'] <= rangeAge) & (self.standartd['Umur'] >= 24)

        print(rangeAge)

        if jenisKelamin == 'laki-laki':
            standardFilter = (self.standartd['JenisKelamin'] == 'male') & (self.standartd['Type'] == 'weight') & filterRangeAge
        else:
            standardFilter = (self.standartd['JenisKelamin'] == 'female') & (self.standartd['Type'] == 'weight') & filterRangeAge

        standardFilterWeight = self.standartd.loc[standardFilter]

        Age =  standardFilterWeight['Umur'].values.reshape(-1,1)
        minTwoSD = standardFilterWeight['-2 SD'].values.reshape(-1,1)
        minOneSD = standardFilterWeight['-1 SD'].values.reshape(-1,1)
        median = standardFilterWeight['Median'].values.reshape(-1,1)

        resultPointA = list()
        resultPointA.extend(a)
        resultPointA.extend([age])

        resultPointB = list()
        resultPointB.extend(b)
        resultPointB.extend([result[0]])

        plt.figure(figsize=(20,10))
        plt.plot(a,b, color='blue', marker='o', label="Berat Badan Anak")
        plt.plot(Age,median, color='green', label="Median")
        plt.plot(Age,minOneSD, color='orange', label="-1 SD")
        plt.plot(Age,minTwoSD, color='red', label="-2 SD")
        plt.plot(resultPointA, resultPointB, color="blue", marker='o', label="Result")
        plt.title('Berat Badan Anak vs Umur', fontsize=14)
        plt.xlabel('Umur (bulan)', fontsize=14)
        plt.ylabel('Berat Badan (kg)', fontsize=14)
        plt.grid(True)
        plt.legend()
        # plt.show()

        weight = BytesIO()
        plt.savefig(weight, format="png")
        data = base64.b64encode(weight.getbuffer())
        results['base64'] = data.decode("UTF-8")


        return results


# Prediction = Prediction()
# ages = 21
# params = {
#     'age': ages,
#     'jenisKelamin': 'male',
#     'tinggiBadan': False,
#     'rangeAge': 24
# }
# heightResult = Prediction.getByHeight(**params)
# weightResult = Prediction.getByWeight(ages=ages, jenisKelamin='female')

# print(json.dumps(heightResult, indent=2))
# print(json.dumps(weightResult, indent=2))