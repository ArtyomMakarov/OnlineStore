import React from 'react';
import isoFetch from 'isomorphic-fetch';

let withDataLoad = (fetchConfig,propName) => Component => {

    class ComponentWithDataLoad extends React.PureComponent {

        componentDidMount = () => {
         // this.getLength();
          this.loadData();

        };

        state = {
          dataReady: false, // готовы ли данные
          combinedProps: null, // исходные пропсы, переданные HOC-у, плюс пропс propName с загруженными данными
        };

      
        fetchError = (errorMessage) => {
          console.error(errorMessage);
        };
      
        fetchSuccess = (loadedData) => {
          this.setState({
            dataReady:true,
            combinedProps:{...this.props,[propName]:loadedData, itemsLength: loadedData.length},
          });
        };

        // getLength = async() => {
        //     try {
        //         let response=await isoFetch(fetchConfig.URL, fetchConfig);
        //         if (!response.ok) {
        //             throw new Error("fetch error " + response.status);
        //         }
        //         let data=await response.json();
        //         this.setState({combinedProps: {...this.state.combinedProps,itemsLength: data.length}});
        //         console.log(this.state.combinedProps);
        //     }
        //     catch ( error )  {
        //         this.fetchError(error.message);
        //     }
        // };
      
        loadData = async () => {
      
          try {
            let response=await isoFetch(fetchConfig.URL, fetchConfig);
            if (!response.ok) {
              throw new Error("fetch error " + response.status);
            }
            let data=await response.json();
            this.fetchSuccess(data);
          } 
          catch ( error )  {
            this.fetchError(error.message);
          }
      
        };
      
        render() {
      
          if ( !this.state.dataReady )
            return <div>загрузка данных...</div>;
      
          return <Component {...this.state.combinedProps} /> ;
        }
      
      }

      return ComponentWithDataLoad;


}

export { withDataLoad };
