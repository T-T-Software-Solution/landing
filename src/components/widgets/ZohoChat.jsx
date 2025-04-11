import React, { useEffect } from 'react';


//Zoho Sales Iq Script:
const useScript = (url, widgetCode) => {
    useEffect(() => {
        // Create container div for widget
        const container = document.createElement('div');
        container.id = 'zsiqwidget';
        document.body.appendChild(container);

        // Initialize Zoho chat widget
        window.$zoho = window.$zoho || {};
        window.$zoho.salesiq = window.$zoho.salesiq || {
            widgetcode: widgetCode,
            values: {},
            ready: function() {}
        };

        // Add Zoho script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'zsiqscript';
        script.defer = true;
        script.src = `${url}?wc=${widgetCode}`;
        document.body.appendChild(script);

        return () => {
            if (container) {
                document.body.removeChild(container);
            }
            if (script) {
                document.body.removeChild(script);
            }
            if (window.$zoho) {
                delete window.$zoho;
            }
        };

    }, [url, widgetCode]);
};

export default function ZohoChat() {

    return (
        <React.Fragment>
            {useScript('https://salesiq.zoho.com/widget', 'siqef67bffff860d3699c538e9e493f4be89fa7a9094e02961959c7df98bfe6c7b1')}
        </React.Fragment>
    );
}