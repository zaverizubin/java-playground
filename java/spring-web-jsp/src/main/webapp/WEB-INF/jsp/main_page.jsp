<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
					
<!DOCTYPE html>
<html >
    <head>
        <title>Activiti Example</title>
        
        <style>
        body {
		  background: #2d343d;
		  font-family: Verdana;
		}
		
		.box {
		  margin: 5px auto;
		  width: 800px;
		  height: 500px;
		  padding: 10px 10px;
		  background: white;
		  border: 1px solid #c4c4c4;
		}
		
		.innerbox {
		  width: 750px;
		  height: 300px;
		  padding: 30px 25px;
		  background: #ddd;
		  border: 1px solid #c4c4c4;
		}
		
		.button {
		  width: 150px;
		  height: 30px;
		  margin: 10px 5px;
		  padding: 0;
		  font-size: 20px;
		  color: #fff;
		  text-align: center;
		  background: #f0776c;
		  border: 0;
		  border-radius: 5px;
		  cursor: pointer; 
		  outline:0;
		}
        
        .right {
		    float: right;
		}

        </style>
        
    </head>
    <body>
    	<div class="box">
	    	<%
	    	String processName = (String)request.getAttribute("processName");
	    	if(processName != null){
	    		out.println("Available process: ${processName}");
	    		
	    	}
	    	%>
<%-- 	    	<c:out value="${username}"></c:out> --%>
	        <h3>Hello  Welcome to the Activiti Example.</h3>
	        <div class="innerbox"></div>
	        <form name='logoutForm' action="<c:url value='j_spring_security_logout' />"  method='post'>
				 <input type="submit" value="Sign Out" class="button"/>
				 <div>
				 <input type="button" onclick="location.href='activiti-init'" value="Start Activiti" class="button right"  /> 
				<input type="button" onclick="location.href='activiti-create-instance'" value="Create Instance" class="button right"  />
				<input type="button" onclick="location.href='activiti-delete-instances'" value="Delete Instances" class="button right"  /> 
				
			</div>
			</form>
			
 		</div>
    </body>
</html>