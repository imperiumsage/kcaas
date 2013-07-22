<?php

function getJSONResponse($url) {
	$ch = curl_init();

	curl_setopt ($ch, CURLOPT_URL, $url);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_COOKIEJAR, "cookie.txt");
	curl_setopt ($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.1.6) Gecko/20070725 Firefox/2.0.0.6");
	curl_setopt ($ch, CURLOPT_TIMEOUT, 0);
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
	//curl_setopt($ch, CURLOPT_HEADER, TRUE);
	$result = curl_exec($ch);
	return $result;
}

$twitterResponse = getJSONResponse("https://twitter.com/trends?pc=true&src=search-home");
$twitterTrends = json_decode($twitterResponse,true);
$twitterHTML = $twitterTrends["module_html"];
$searchText = '<li class="trend-item js-trend-item  " data-trend-name="';


$start = strpos($twitterHTML,$searchText) + strlen($searchText);
$end = strpos($twitterHTML,'" >',$start);
$twitterTopTrend = substr($twitterHTML, $start,$end-$start)."\n";
//print $twitterTopTrend."\n"; 
exec('curl -H "X-secretKey: 1q2w3e#" -X POST "http://kcaas.herokuapp.com/providers/twitter" -d "trending='.$twitterTopTrend.'"');



$googResponse =  getJSONResponse("https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A%2F%2Fwww.google.com%2Ftrends%2Fhottrends%2Fatom%2Fhourly");
$googData =  json_decode($googResponse,true);
$googTrends = explode("\n",trim($googData["responseData"]["feed"]["entries"][0]["contentSnippet"]));
//print trim($googTrends[0]);	
exec('curl -H "X-secretKey: 1q2w3e#" -X POST "http://kcaas.herokuapp.com/providers/google" -d "trending='.$googTrends[0].'"');

?>