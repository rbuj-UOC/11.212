#!/usr/bin/env bash

echo "Starting upgrade of all projects..."
echo ""

# Find all package.json files and extract their parent directories
project_count=0
success_count=0

while IFS= read -r package_file; do
  project_dir=$(dirname "$package_file")
  project_name=$(basename "$project_dir")
  
  echo "[*] Upgrading dependencies in: $project_dir"
  
  if (cd "$project_dir" &&  rm -fr node_modules package-lock.json && npx npm-check-updates -u); then
    echo "[+] Successfully upgraded dependencies in $project_dir"
    ((success_count++))
  else
    echo "[-] Failed to upgrade dependencies in $project_dir"
  fi
  
  echo ""
  ((project_count++))
done < <(find . -name "package.json" -not -path "./.git/*" -not -path "*/node_modules/*")

echo "==================================================="
echo "[$project_count projects found, $success_count successfully upgraded]"
echo "Upgrade complete!"
