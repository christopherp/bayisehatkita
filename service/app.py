from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
import joblib
import numpy as np
import pandas as pd
import sys

flask_app = Flask(__name__, static_folder='ui/build', static_url_path='/')

@flask_app.route('/')
def index():
    return flask_app.send_static_file('index.html')

if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

@flask_app.errorhandler(404)
def not_found(e):
    return flask_app.send_static_file('index.html')

app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Stunting Risk Prediction Tool", 
		  description = "")

kalkulatorRisiko = app.namespace('hitung-risiko', description='Prediction APIs')
prediksiPertumbuhan = app.namespace('prediksi-pertumbuhan', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'tinggiBapak': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'tinggiIbu': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'statusBekerjaIbu': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'pendidikanIbu': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'tempatTinggal': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'beratLahir': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'sanitasi': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank"),
                    'quintileEkonomi': fields.Float(required = True, 
				  							   description="", 
    					  				 	   help="Cannot be blank")                              
                                                  })

classifier = joblib.load('classifier.joblib')
antropometri = joblib.load('antropometri.joblib')

def processPendidikanIbu(value):
		conditions_ibu = [
			(value < 10),
			(value < 20) ,
			(value < 30),
		]
		values = [0, 1, 2]

		kategoriPendidikan = np.select(conditions_ibu, values, default=None)
		return str(kategoriPendidikan)

def processTinggiOrtu(tinggi, tipe):
		tinggi_ibu_rendah = 146.20374401868486
		tinggi_ibu_tinggi = 157.10120092625897

		tinggi_ayah_rendah = 157.3582269480648
		tinggi_ayah_tinggi = 169.50695786711972

		conditions_ibu = [
			(tinggi < tinggi_ibu_rendah),
			(tinggi >= tinggi_ibu_rendah) & (tinggi <= tinggi_ibu_tinggi),
			(tinggi > tinggi_ibu_tinggi),
		]

		conditions_ayah = [
			(tinggi < tinggi_ayah_rendah),
			(tinggi >= tinggi_ayah_rendah) & (tinggi <= tinggi_ayah_tinggi),
			(tinggi > tinggi_ayah_tinggi),
		]

		values = [0, 1, 2]

		kategoriTinggi = np.select(conditions_ibu if tipe=="ibu" else conditions_ayah, values, default=None)
		return str(kategoriTinggi)

def processBeratBayi(berat):
		conditions = [
			(berat < 2.5),
			(berat >= 2.5),
		]

		values = [0, 1]
		kategoriBeratBayi = np.select(conditions, values, default=None)
		return str(kategoriBeratBayi)

def labeling_stunting(umur, tinggi, jenis_kelamin):
		jeniskelamin = '1:Male' if jenis_kelamin=='0' else '3:Female'
		antropometri_var = antropometri.loc[(antropometri['umur'] == umur) & (antropometri['jenis_kelamin']== jeniskelamin)]
		median = antropometri_var['median'].iloc[0]
		sd_min1 = antropometri_var['sd_min1'].iloc[0]
		zscore = (tinggi - median) / (median- sd_min1)

		if(zscore < -2):
			return True
		else:
			return False

@kalkulatorRisiko.route("/")
class KalkulatorRisiko(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response


	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
								
			stunting =	labeling_stunting(float(data[0]),float(data[1]),data[2])
			print(data)	
			
			if(stunting):
				result = "Anak anda saat ini tergolong balita stunting"
			else:
				data[3] = processTinggiOrtu(float(data[3]),"ayah")
				data[4] = processTinggiOrtu(float(data[4]),"ibu")
				data[6] = processPendidikanIbu(float(data[6]))
				data[8] = processBeratBayi(float(data[8]))
				prediction = classifier.predict_proba(np.array(data[3:11]).reshape(1, -1))
				persentase = prediction[0,1]*100
				result = "Resiko anak akan mengalami stunting: " + str('%.3f' % persentase) + "%"	
			
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": result
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})

@prediksiPertumbuhan.route("/")
class PrediksiPertumbuhan(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response


	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
										
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": data[0]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})