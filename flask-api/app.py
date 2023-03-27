from flask import Flask , jsonify , request
from flask_cors import cross_origin,CORS
import json , pygsheets
import pandas as pd

#authorization
# gc = pygsheets.authorize(service_file='creds.json')

# Create empty dataframe
# df = pd.DataFrame()

# sh = gc.open('asdf')

app = Flask(__name__)
CORS(app)

data = [{'id':1 , 'title':"Groccery" , 'amount':500 , 'date' : "Sat Jul 23 2022 18:52:14 GMT+0530 (India Standard Time)"},
        {"amount":120,"date":"Sat Jul 23 2022 18:52:14 GMT+0530 (India Standard Time)","id":2,"title":"books"}]

global i
i=1

data = []
@app.route('/getdata' , methods=["GET"])
def main():
    return json.dumps(data,indent=2)

@app.route('/postdata' , methods=["POST"])
def add():
    global i
    x=request.get_json(force=True)
    data.append(x)
    print(data)

    #select the first sheet 
    # wks = sh[0]
    # df['id']  = [x['id']]
    # df['title'] = [x['title']]
    # df['amount'] = [x['amount']]
    # df['date'] = [x['date']]

    # #update the first sheet with df, starting at cell B2. 
    # wks.set_dataframe(df,(i,1))
    # i+=1

    return json.dumps(data,indent=2)

@app.route('/deletedata/<idx>' , methods=['DELETE'])
def delete(idx):
     for i in range(0,len(data)):
         print(i , idx)
         if(data[i]['id'] == idx):
             data.pop(i)
             break
     print(data)
     return json.dumps(data ,  indent=2)

@app.route('/updatedata/<idx>' , methods = ['PUT'])
def update(idx):
    title = request.json['title']
    amount = request.json['amount']
    date = request.json['date']

    for i in range(0,len(data)):
        print(i , idx)
        if(data[i]['id'] == idx):
            data[i]['title'] = title
            data[i]['amount'] = amount
            data[i]['date'] = date
    print(data)
    return json.dumps(data , indent = 2)

if __name__=="__main__":
    app.run(host='127.0.0.1' , port=4500 , debug=True)
