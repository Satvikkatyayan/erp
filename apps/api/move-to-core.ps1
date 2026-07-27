$expenseDir = "D:\erpvvinfratech\apps\api\src\modules\expense"
$coreDir = "D:\erpvvinfratech\apps\api\src\core"

# Execution
New-Item -ItemType Directory -Force -Path "$coreDir\execution\interfaces"
New-Item -ItemType Directory -Force -Path "$coreDir\execution\envelope"
New-Item -ItemType Directory -Force -Path "$coreDir\execution\failure"
New-Item -ItemType Directory -Force -Path "$coreDir\execution\scheduler"

Move-Item -Path "$expenseDir\execution\interfaces\*" -Destination "$coreDir\execution\interfaces\" -Force
Move-Item -Path "$expenseDir\execution\envelope\*" -Destination "$coreDir\execution\envelope\" -Force
Move-Item -Path "$expenseDir\execution\failure\*" -Destination "$coreDir\execution\failure\" -Force
Move-Item -Path "$expenseDir\execution\scheduler\*" -Destination "$coreDir\execution\scheduler\" -Force
Move-Item -Path "$expenseDir\execution\execution-context.ts" -Destination "$coreDir\execution\" -Force

# Retry
New-Item -ItemType Directory -Force -Path "$coreDir\retry"
Move-Item -Path "$expenseDir\execution\retry\*" -Destination "$coreDir\retry\" -Force

# CQRS
New-Item -ItemType Directory -Force -Path "$coreDir\cqrs"
Move-Item -Path "$expenseDir\projections\interfaces\projection-handler.interface.ts" -Destination "$coreDir\cqrs\" -Force
Move-Item -Path "$expenseDir\projections\interfaces\read-model-version.interface.ts" -Destination "$coreDir\cqrs\" -Force
Move-Item -Path "$expenseDir\interfaces\cacheable-query.interface.ts" -Destination "$coreDir\cqrs\" -Force

# Clean up empty dirs
Remove-Item -Path "$expenseDir\execution\envelope" -Recurse -Force
Remove-Item -Path "$expenseDir\execution\failure" -Recurse -Force
Remove-Item -Path "$expenseDir\execution\interfaces" -Recurse -Force
Remove-Item -Path "$expenseDir\execution\retry" -Recurse -Force
Remove-Item -Path "$expenseDir\execution\scheduler" -Recurse -Force
