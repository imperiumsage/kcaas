KCAAS (Keep Calm as a Service)
=====

KCAAS (Keep Calm As A Service) provides a modern, RESTful, scalable solution to the common problem of telling oneself to keep calm and do whatever one is doing.

# API

## /

Default action, returns the age old message of traditional British tightlipped calmness under fire.

## /custom/:message

Will return content of the form 'Keep Calm and :message, e.g. /custom/Carry On will return 'Keep Calm and Carry On'.

There are loads of eastereggs here which will change the top image based on value of message

## /trending/:provider

Will return content of the form 'Keep Calm and <#1 trend on provider>', e.g. /trending/google will return 'Keep Calm and Carlos Danger'. Currently two providers are supported: google and twitter. A web scraper scrapes the trend at the top of the hour and keeps this up to date.


# Live demo

- http://kcaas.herokuapp.com


# Roadmap

KCASS will be extended to include the following functionality:

* Provide self trends as a provider, showing top 10 most common messages for the day from Google Analytics
* More easter eggs shenaningans and interactive content.


All contributions are very welcome.

