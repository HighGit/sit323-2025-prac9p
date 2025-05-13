******This is GitHub for task 6.1P and 6.2C of SIT323******
**Set up Kubernetes**
In Docker Desktop, go to settings -> Kubernetes -> Enable Kubernetes
Wait until the Cluster is up and running.
Create a user for Kubernetes
Deploy the Dashboard UI
Inside the code, use the following command: 
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommened.yaml

**Create a Sample User**
Create the dashboard-adminuser.yaml 
In the terminal, use: kubectl apply -f dashboard-adminuser.yaml

Creating a ClusterRoleBinding
 
Create a file cluster_role_binding.yaml
In the terminal, use: kubectl apply -f cluster_role_binding.yaml

**Login To Dashboard**
At this point, the dashboard and user have been created, now we need to lauch the Dashboard.
In a terminal, use this line: kubectl proxy
 
• Then, login with the following URL: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
• Select Token 
• Login Using the received token
To get the token, in the terminal, use:
 kubectl -n kubernetes-dashboard create token admin-user

**Deployment and Service**
In the terminal, use: 
kubectl apply -f kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

Note: We need to build and push sit323-task6p to Dockerhub first.

**Access the microservice page**
Go to the Dashboard -> Services
We should be seeing our service running. Then we can go to the external endpoint to check if the page is working properly (In my case is port 80).
You can also check pods and services in the terminal using:
  kubectl get pods
  kubectl get services
You can also forward the port to the one that you want using:
 kubectl port-forward svc/sit323-task6p-service 8080:80
Now, if I go to port 8080, the microservice will appear and should work exactly the same as it was in port 80
   
