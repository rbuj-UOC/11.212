#!/usr/bin/env bash

# Description: Initializes all projects in the workspace by running npm install
# in each directory that contains a package.json file

echo "Starting setup of all projects..."
echo ""

# Find all package.json files and extract their parent directories
project_count=0
success_count=0

while IFS= read -r package_file; do
  project_dir=$(dirname "$package_file")
  project_name=$(basename "$project_dir")
  
  echo "[*] Installing dependencies in: $project_dir"
  
  if (cd "$project_dir" && npm install); then
    echo "[+] Successfully installed dependencies in $project_dir"
    ((success_count++))
  else
    echo "[-] Failed to install dependencies in $project_dir"
  fi
  
  echo ""
  ((project_count++))
done < <(find . -name "package.json" -not -path "./.git/*" -not -path "*/node_modules/*")

echo "==================================================="
echo "[$project_count projects found, $success_count successfully installed]"
echo "Setup complete!"
