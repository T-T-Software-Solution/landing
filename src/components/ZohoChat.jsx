import React, { useEffect } from 'react';


//Zoho Sales Iq Script:
const useScript = (url, widgetCode) => {
    useEffect(() => {
        // Create sandbox iframe
        const sandbox = document.createElement('iframe');
        sandbox.id = 'zoho-sandbox';
        sandbox.sandbox = 'allow-scripts allow-same-origin allow-popups';
        sandbox.style.cssText = 'position: fixed; bottom: 0; right: 0; border: none; width: 100%; height: 100%;';
        document.body.appendChild(sandbox);

        // Wait for iframe to load then initialize content
        sandbox.addEventListener('load', () => {
            const sandboxDocument = sandbox.contentWindow.document;

            // Setup basic HTML structure
            sandboxDocument.open();
            sandboxDocument.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Zoho Chat Widget</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                    </head>
                    <body>
                        <div id="zsiqwidget"></div>
                    </body>
                </html>
            `);
            sandboxDocument.close();

            // Add script to sandbox
            const script = sandboxDocument.createElement('script');
            script.setAttribute("type", "text/javascript");

            let code = `
                var $zoho=$zoho || {};
                $zoho.salesiq = $zoho.salesiq || {
                    widgetcode: "${widgetCode}",
                    values:{},
                    ready:function(){}
                };
                var d=document;
                s=d.createElement("script");
                s.type="text/javascript";
                s.id="zsiqscript";
                s.defer=true;
                s.src="${url}";
                t=d.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(s,t);
            `;

            script.appendChild(sandboxDocument.createTextNode(code));
            sandboxDocument.body.appendChild(script);
        });

        // Cleanup function
        return () => {
            if (sandbox) {
                document.body.removeChild(sandbox);
            }
            if (window.$zoho) {
                delete window.$zoho;
            }
        };

    }, [url, widgetCode]);
};

export default function SalesIQ() {

    return (
        <React.Fragment>
            {useScript('https://salesiq.zoho.com/widget', 'siqef67bffff860d3699c538e9e493f4be89fa7a9094e02961959c7df98bfe6c7b1')}
        </React.Fragment>
    );
}