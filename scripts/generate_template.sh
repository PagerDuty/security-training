#!/bin/bash
# Usage: ./generate_template.sh <number_of_slides>

# Quick error check.
if [ $# -eq 0 ]; then
    echo "Missing argument, expect integer <number_of_slides>."
    exit 1
fi

# For each slide, just dump out it's content to stdout.
iterations=$1
counter=1
while [ $counter -le $iterations ]
do
  # Leading 0's needed.
  id=$(printf "%03d\n" $counter)

  # Will need to find/replace __dir__ and __prefix__ in the final output.
  echo "### Title"
  echo ""
  echo "<input type=\"checkbox\" id=\"$id\" /><label for=\"$id\">![$id](/slides/__dir__/__prefix__.$id.jpeg)</label>"
  echo "_$id. Caption._"
  echo ""
  echo "Notes"
  echo ""
  echo "---"
  echo ""

  ((counter++))
done
