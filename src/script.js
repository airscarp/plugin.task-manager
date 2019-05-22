var tasks = {
    
    
    // Get Data
    get_data : function(func){
        
        if(func === undefined) return false;
        
        airscarp.plugin.shell.get("task-manager.list", function(x){
            
            if(x.s) func(x.data);
        });
    },
    
    
    // Show Table
    show_table : function(data){
        
        var data  = data["task-manager.list"];
        var tbody = [];
        
        for(var i = 0; i < data.length; i++){
            
            tbody.push([
                "<tr data-pid='" + data[i]["pid"] + "'>",
                    "<td><a href='#close-task' data-close-task='" + data[i]["pid"] + "' data-toggle='tooltip' data-placement='right' title='Close'><i class='fas fa-times'></i></a></td>",
                    "<td class='nowrap'><i class='fas fa-user mr-2'></i>" + data[i]["user"] + "</td>",
                    "<td>" + data[i]["pid"] + "</td>",
                    "<td>" + data[i]["tty"] + "</td>",
                    "<td>" + data[i]["cpu"] + "%</td>",
                    "<td>" + data[i]["mem"] + "%</td>",
                    "<td>" + data[i]["time"] + "</td>",
                    "<td><span class='task-manager-command-col'>" + data[i]["command"] + "</span></td>",
                "</tr>",
            ].join(""));
        }
        
        $("#task-manager-table tbody").html(tbody.join(""));
    },
    
    
    // Listeners
    listener : {
        
        
        // CLose Task
        close : function(){
            
            $(document).on("click", "[data-close-task]", function(e){
                
                e.preventDefault();
                
                var pid = $(this).attr("data-close-task");   
                console.log(pid);
                
                if(pid === undefined || !pid){
                    airscarp.error("Something went wrong.");
                    return false;
                }
                
                // Close
                airscarp.plugin.shell.exec("kill " + pid, function(x){
                    
                    if(!x.s){
                        airscarp.error("Error.");
                        return false;
                    }
                    
                    $("tr[data-pid='" + pid + "']").hide();
                    airscarp.success("Closed!");
                    
                });
            });
        }
    },
};