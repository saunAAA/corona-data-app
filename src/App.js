import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import './App.css';
import Button from '@material-ui/core/Button';

const API_URL =
  'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

const coronaDataSchema = {
  objectIdFieldName: '',
  uniqueIdField: {},
  globalIdFieldName: '',
  fields: [],
  exceededTransferLimit: false,
  features: [],
};

function App() {
  const [loading, setLoading] = useState(false);
  const [coronaData, setCoronaData] = useState(coronaDataSchema);
  const [showDataTable, setShowDataTable] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const result = await fetch(API_URL);
      const data = await result.json();
      setCoronaData(data);
      console.log(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        {loading ? <h1>loading...</h1> : <h1>Corona-Data</h1>}
        <div className="App-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setShowDataTable(true);
            }}
          >
            Aktuelle Daten anzeigen
          </Button>
        </div>
        {coronaData.fields.length > 0 && showDataTable ? (
          <div>
            <DataTable data={coronaData}></DataTable>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
