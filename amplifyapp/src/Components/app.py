from flask import Flask, jsonify
import requests
import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/chart-data', methods=['GET'])
def get_chart_data():
    url = 'http://34.127.79.39:18292/GETHISTORY'
    response = requests.get(url)
    data = response.json()

    df = pd.DataFrame([(timestamp, resolver, website, performance) for timestamp, data in data.items()
                    for resolver, metrics in data.items()
                    for website, performance in metrics.items()],
                    columns=['timestamp', 'resolver', 'website', 'performance'])

    df['timestamp'] = pd.to_datetime(df['timestamp'])

    selected_combinations = [('cloudflare', 'adobe.com'), ('cloudflare', 'google.com'),
                            ('cloudflare', 'opendns.com'), ('google', 'adobe.com'),
                            ('google', 'google.com'), ('google', 'opendns.com'),
                            ('opendns', 'adobe.com'), ('opendns', 'google.com'),
                            ('opendns', 'opendns.com'), ('quad9', 'adobe.com'),
                            ('quad9', 'google.com'), ('quad9', 'opendns.com'),
                            ('cloudflare', 'apple.com'), ('google', 'apple.com'),
                            ('opendns', 'apple.com'), ('quad9', 'apple.com')]
    df_selected = df[df.apply(lambda row: (row['resolver'], row['website']) in selected_combinations, axis=1)]

    df_selected['30_day_avg'] = df_selected.groupby(['resolver', 'website'])['performance'].transform(lambda x: x.rolling(window=30, min_periods=1).mean())

    last_30_days = df_selected['timestamp'].max() - pd.DateOffset(days=29)
    df_selected_last_30_days = df_selected[df_selected['timestamp'] >= last_30_days]

    data_for_model = df_selected_last_30_days[['timestamp', 'resolver', 'website', '30_day_avg']].drop_duplicates().set_index('timestamp')

    forecast_results = {}
    for (resolver, website), group in data_for_model.groupby(['resolver', 'website']):
        model = ExponentialSmoothing(group['30_day_avg'], seasonal_periods=12, trend='add', seasonal='add').fit()
        forecast = model.forecast(steps=30)  # Forecasting 30 days ahead
        forecast_results[(resolver, website)] = forecast.tolist()  # Convert forecast to list

    chart_data = {}
    for (resolver, website), forecast in forecast_results.items():
        timestamps = pd.date_range(start=df_selected_last_30_days['timestamp'].max() + pd.DateOffset(days=1), periods=30, freq='D')
        chart_data[f"{resolver} - {website}"] = {
            "labels": timestamps.strftime('%Y-%m-%d').tolist(),  # Convert timestamps to list of strings
            "datasets": [
                {
                    "label": "Forecast",
                    "data": forecast
                }
            ]
        }

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True)
