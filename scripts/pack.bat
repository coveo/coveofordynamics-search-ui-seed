@ECHO ON

start /B "" ".\nuget\Microsoft.CrmSdk.CoreTools.9.0.0.7\content\bin\coretools\SolutionPackager.exe" /action:Pack /zipfile:"./bin/solution/CoveoforDynamicsTutorial.zip" /folder:"./bin/Serialized/" /packagetype:Unmanaged /map:"./scripts/mappings.xml"