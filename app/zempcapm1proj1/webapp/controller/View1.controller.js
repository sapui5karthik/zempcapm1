sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("zempcapm1proj1.controller.View1", {
        onInit: async function () {
            var oModel = this.getOwnerComponent().getModel();
            const oListBinding = oModel.bindList("/ReadEmp");
            const aContexts = await oListBinding.requestContexts(0, 100); // skip=0, top=100

            const aEmp = aContexts.map(ctx => ctx.getObject());

            console.log("Employees:", aEmp);
            var json1 = new JSONModel();
            json1.setData(aEmp);
            this.getView().setModel(json1, 'emp');


        },
        onCreate: function () {
            var oModel = this.getOwnerComponent().getModel();


            const sEmpid = this.byId("idEmpid").getValue();
            const sEmpname = this.byId("idEmpname").getValue();

           
            const oListBinding = oModel.bindList("/ReadEmp", undefined, [], null, {
                $$updateGroupId: "createGroup"
            });
           
            oListBinding.create({
                empid: sEmpid,
                empname: sEmpname
            });           
            oModel.submitBatch("createGroup").then(() => {
                sap.m.MessageToast.show("Employee created successfully");            
               this.onInit();

             this.byId("idEmpid").setValue();
            this.byId("idEmpname").setValue();
            }).catch((err) => {
                sap.m.MessageBox.error("Creation failed: " + err.message);
            });


        },
        onSelectRow : function(oEvent){
            const oSelectedItem = oEvent.getParameter("listItem"); // The selected row (ColumnListItem)
            const oContext = oSelectedItem.getBindingContext("emp");    // Context of selected row
            const oData = oContext.getObject();                    // Actual row data
        
            // Example usage
            const empId = oData.empid;
            const empName = oData.empname;
        
            // Optional: Set values in form fields
            this.byId("idEmpid").setValue(empId);
            this.byId("idEmpname").setValue(empName);
                      

        },
        onUpdate : function(){
            const oModel = this.getOwnerComponent().getModel(); // OData V4 model

            const sEmpid = this.byId("idEmpid").getValue();  
             const sPath = `/ReadEmp('${sEmpid}')`;   
           oModel.bindContext(sPath, undefined, {
                $$updateGroupId: "updateGroup"
            });
             oModel.submitBatch("updateGroup")
                .then(() => {
                    sap.m.MessageToast.show("Employee updated successfully");
                    this.onInit();
                    this.byId("idEmpid").setValue();
            this.byId("idEmpname").setValue();
                })
                .catch((err) => {
                    sap.m.MessageBox.error("Update failed: " + err.message);
                });
        },
      
          
    });
});