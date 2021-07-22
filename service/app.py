from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
from api.StuntingPredictionApi import Prediction
#from flask_cors import CORS
import json
import numpy as np
import pandas as pd

flask_app = Flask(__name__, static_folder='ui/build', static_url_path='/')

#CORS(flask_app)

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
		  title = "Stunting Prediction Tool", 
		  description = "")

Prediction = Prediction()

@app.route('/api/weight', methods=["POST"])
class GetWeight(Resource):
	def post(self):
		try:
			params = request.json
			weight_result = Prediction.getByWeight(**params)
			return {'data' : weight_result}
		except Exception as e:
			return {'error': str(e)}

@app.route('/api/height', methods=["POST"])
class GetHeight(Resource):
	def post(self):
		try:
			params = request.json
			height_result = Prediction.getByHeight(**params)
			return {'data' : height_result}
		except Exception as e:
			return {'error': str(e)}

@app.route('/api/data', methods=["POST"])
class GetData(Resource):
	def post(self):
		try:
			print(request.json)
			requestJson = request.json
			params = dict()
			params['age'] = int(requestJson.get('umur'))
			params['jenisKelamin'] = requestJson.get('jenisKelamin')
			params['rangeAge'] = int(requestJson.get('rangeBulan'))

			datas = dict()
			datas['weights'] = []
			datas['heights'] = []
			result = list()
			weights = dict(filter(lambda item: 'berat' in item[0], requestJson.items()))
			if weights:
				for item in weights:
					value = dict()
					value['Umur'] = int(item.split('-')[1])
					value['BB'] = float(weights[item])
					datas['weights'].append(value)
				params['beratBadan'] = json.dumps(datas['weights'])
				weightResult = Prediction.getByWeight(**params)
				result.append(weightResult)

			heights = dict(filter(lambda item: 'tinggi' in item[0], requestJson.items()))
			if heights:
				for item in heights:
					value = dict()
					value['Umur'] = int(item.split('-')[1])
					value['TB'] = float(heights[item])
					datas['heights'].append(value)
				params['tinggiBadan'] = json.dumps(datas['heights'])
				heightResult = Prediction.getByHeight(**params)
				result.append(heightResult)

			return {'data' : result}
		except Exception as e:
			return {'error': str(e)}

from api.RiskPredictionApi import RiskPredictionApi