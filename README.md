# Periodic Domain Name Server Resolver (PDNSR) Recommender
Periodic Domain Name Server (PDNSR) Recommendation is a web application that will keep track of the performances of various public Domain Name Server Resolvers (such as Google, OpenDNS, Quad9, CloudFare, etc). It will report historial latencies of DNS resolvers, real time results, and predictions of future latencies. This application will have both local and global features, allowing for users to see DNS results for their specific location as well as results from all users and centralized measurement. The centralized measurement results will be continuously updated every 30 minutes. Real time results will be pulled whenever a user visits the website. Future predictions will be made by machine learning models that are trained on the historical data. The application will contain various data visualizations which will show the past performance of the resolvers as well as predict the future performance. This application will have dual purposes as it can be used to conduct research or it can be used for individuals who want to find out which resolver has the best performance at a particular location at a given time. The application will be built using the React.js framework and hosted using AWS Amplify. The data visualizations will be made using D3.js. 

Contributors: Hiroki Nakayama, Nico Guerra, Emma Guarnieri, Joey Li, Nikki D'Costa
