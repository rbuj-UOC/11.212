#!/usr/bin/env bash

# This script finds all files in the current directory tree (excluding .git) and displays
# them sorted by size in human-readable format (B, KB, MB, GB) along with their full file
# paths.

find . -type f -not -path "./.git/*" -exec stat -f "%z %N" {} + \
  | sort -n \
  | awk '{ 
      size=$1;
      if (size < 1024)       unit="B";
      else if (size < 1048576) { size=size/1024; unit="KB"; }
      else if (size < 1073741824) { size=size/1048576; unit="MB"; }
      else { size=size/1073741824; unit="GB"; }
      filename=substr($0, index($0, $2));
      printf "%.2f %s %s\n", size, unit, filename;
    }'