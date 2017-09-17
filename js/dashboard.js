//Note : requires Jquery on the path

/***Cleanup notes:
// TODO: 1)var input =  demoInput; is not needed if the global space does not change once its loaded.
		 2) change the colors for passed bar from blue to green. 
		 3) see if the the guage backgroundColor needs to be green or if possible, a gradient of RYG!? ;)
		 
		 4) check unused alerts lying here and there...
		
 **/ 
 
 
var passedStatus = "Passed";
var failedStatus = "Failed";
 
function createBarChart(){

	var input =  demoInput;
	
	var passed = input.passedCount;
	var failed = input.failedCount;
	var total = input.totalTestCases;
			
		setTimeout(function(){
				 
			var ctx = document.getElementById('barChart').getContext('2d');
			var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Passed', 'Failed'],
				datasets: [{
					label: '# of test cases',
					data: [passed, failed],
					backgroundColor: ['rgba(186, 242, 217, 0.3)' , 'rgba(255, 99, 132, 0.3)'], //rgb(179, 255, 218), 'rgba(54, 162, 235, 0.2)'
					borderColor:['rgba(75, 192, 192, 1)','rgba(255,99,132,1)'] ,
					borderWidth: 1
				}
				]
			},					
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true,
						}
						
					}],
					xAxes: [{
						barPercentage: 0.4,
						gridLines: {
							display: false
						}
					}]
				},
				legend: { display: false },
				  title: {
					display: true,
					text: 'Number of test cases :' + total,
					position:'bottom'
				  }
			}
			
		});		
	},100); 
	
}

function createGuageChart(){
	
	var input =  demoInput;
	var passedPercent =  ( parseInt(input.passedCount) / parseInt(input.totalTestCases) ) * 100;
	
	
	var g = new JustGage({
		id: "gaugeChart",
		value: passedPercent,
		min: 0,
		max: 100,
		//title: "Test passed(%)",
		//donut: true,
		gaugeWidthScale: 0.6,
		label: '(Passed)',
		textRenderer: function(val) {
			return val + '%';
		},
		levelColors: [ "#ff0000", "#F27C07", "#a9d70b"  ],
		
		/*customSectors: {
        ranges: [{
          color : "#ff3b30",
          lo : 0,
          hi : 50
        },{
          color : "#43bf58",
          lo : 51,
          hi : 100
        }]
      },*/
      counter: true		
				
	});

}

function setTotalExecutionTime(){
	
	var input =  demoInput;
	$("#totalExecutionTimeContainer").text(input.totalExecutionTime);
	
}

function setTestCasesTable(){
	
	var input =  demoInput;
	var trHTML = '<tbody>';
    
	$.each(input.testCases, function (i, item) {
        trHTML += '<tr id=' + i + '>'
			+ '<td>' + item.name + '</td>'
			+ '<td>' + item.description + '</td>'
			+ '<td>' + getStyledStatus(item.status) + '</td>'
			+ '<td>' + getDetailsSpan(i) + '</td>'+			
			+'</tr>';
			
    });
	
	trHTML += '</tbody>';
		
	$('#testCaseStatusTable').append(trHTML);
	
}

function getDetailsSpan(rowId){
		
	return '<a href="#">'
			+ '<span class="glyphicon glyphicon-zoom-in icon-zoom-in-lg"></span>'
			+ '</a>';		
}

function getStyledStatus(testCaseStatus){

	if(testCaseStatus == passedStatus ){
	   return '<span class="glyphicon glyphicon-ok icon-passed"></span>';
	}
	
	return '<span class="glyphicon glyphicon-remove icon-failed"></span>';

}

//fetch the corresponding test details for a row id. 
function getTestRunDetails(rowId){

	var input =  demoInput;	
	var testDetails = input.testCases[rowId].stepsDetails;
	updateTestRunDetailsTable(testDetails);
}

function updateTestRunDetailsTable(testDetails){
	
	// clean the childNodes first. And, then append tbody of testCaseDatailsTable
	
	$('#testCaseDatailsTable > tbody').html("");
	
	var trHTML = '';    
	
	$.each(testDetails, function (i, item) {
        trHTML += '<tr id=' + i + '>'
			+ '<td>' + item.stepId + '</td>'
			+ '<td>' + item.stepDescription + '</td>'
			+ '<td>' + getStyledStatus(item.status) + '</td>'
			+ '<td>' + getStyleScreenshot(item.screenshotFile, item.stepDescription, item.stepId ) + '</td>'			
			+'</tr>';
			
    });
		
	$('#testCaseDatailsTable > tbody').html(trHTML);
	
}

function getStyleScreenshot(imageFile, stepDescription, stepId){
	
	var htmlCnt = '<a href="#" onclick="showScreenShot(\''+ imageFile 
			+ ' \' , \''+ stepDescription
			+ ' \' , \''+ stepId
			+ ' \');">'
			+ '<span class="glyphicon glyphicon-camera icon-screenshot-passed"> </a>';
	
	return htmlCnt;
}

function showScreenShot(imageFile, description, stepId){
	
	var $textAndPic = $('<div></div>');
        $textAndPic.append('<b>Test Description:</b>' + description);		
		$textAndPic.append('<div style="padding-top: 20px;">');		
		$textAndPic.append('<img class="img-responsive" src="../image/demo_images/'+ imageFile  + '"> ');
		$textAndPic.append('</div>');
		
        BootstrapDialog.show({
            title: 'Screenshot for Step no. : '+ stepId ,
            message: $textAndPic,
            buttons: [{
                label: 'Close',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }
			]
        });
}

var demoInput = {
	
	"appId": "NeXT Application",
	"appName":"NeXT Application",
	"totalTestCases":200,
	"passedCount":160,
	"failedCount":40,
	"totalExecutionTime":"15 mins",
	"testCases":[
		{
			"name":"Test Case1",
			"description":"check page load",
			"status":"Passed",
			"stepsDetails":[
				{
					"stepId" : 1,
					"stepDescription" : "step  description 1",
					"status" : "Passed",
					"screenshotFile":"image1.png"
				},				
				{
					"stepId" : 2,
					"stepDescription" : "step  description 2",
					"status" : "Passed",
					"screenshotFile":"image2.png"
				}
			]
		},
		{
			"name":"Test Case2",
			"description":"check customer is added",
			"status":"Passed",
			"stepsDetails":[
				{
					"stepId" : 1,
					"stepDescription" : "step description 1",
					"status" : "Passed",
					"screenshotFile":"image1.png"
				},				
				{
					"stepId" : 2,
					"stepDescription" : "step description 2",
					"status" : "Passed",
					"screenshotFile":"image2.png"
				},
				{
					"stepId" : 3,
					"stepDescription" : "step 3",
					"status" : "Passed",
					"screenshotFile":"image3.png"
				}
			]
		},
		{
			"name":"Test Case3",
			"description":"check send button is disabled until all form elements are polpulated",
			"status":"Failed",
			"stepsDetails":[
				{
					"stepId" : 1,
					"stepDescription" : "step 1",
					"status" : "Passed",
					"screenshotFile":"image1.png"
				},				
				{
					"stepId" : 2,
					"stepDescription" : "step 2",
					"status" : "Passed",
					"screenshotFile":"image2.png"
				},
				{
					"stepId" : 3,
					"stepDescription" : "step 3",
					"status" : "Passed",
					"screenshotFile":"image3.png"
				},
				{
					"stepId" : 4,
					"stepDescription" : "step 4",
					"status" : "Failed",
					"screenshotFile":"image4.png"
				}
			]
		}
	]
}