
"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn, escapeHtml } from "@/lib/utils";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

export default function GeneratedForm() {

 const formSchema = z.object({
  "text-input-0": z.string(),
"select-0": z.string(),
"textarea-0": z.string(),
"radio-0": z.string(),
"date-0": z.string(),
"text-1": z.string(),
"switch-0": z.string(),
"switch-1": z.string(),
"button-0": z.string(),
"checkbox-group-0": z.string(),
"checkbox-1": z.string(),
"text-input-1": z.string(),
"file-input-0": z.string(),
 });


function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}


const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    "text-input-0": "",
"select-0": "",
"textarea-0": "",
"radio-0": "",
"date-0": "",
"text-1": "",
"switch-0": "",
"switch-1": "",
"button-0": "",
"checkbox-group-0": "",
"checkbox-1": "",
"text-input-1": "",
"file-input-0": "",
  },
});

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="text-input-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Username</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <Input
    key="text-input-0"
    placeholder="shadcn"
    type="text"
    id="text-input-0"
    name=""
    className=""
  />  
  
                </FormControl>
                <FormDescription>
                    This is your public display name.
                  </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="select-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Email</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <Select
    key="select-0"
    id="select-0"
    name=""
    className=""
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a verified email to display" />
    </SelectTrigger>
    <SelectContent>
      
        <SelectItem key="option1" value="option1">
          Option 1
        </SelectItem>
      

        <SelectItem key="option2" value="option2">
          Option 2
        </SelectItem>
      
    </SelectContent>
  </Select>
  
                </FormControl>
                <FormDescription>
                    You can manage email addresses in your email settings.
                  </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="textarea-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Bio</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <Textarea
    key="textarea-0"
    id="textarea-0"
    name=""
    placeholder="Tell us a little bit of yourself"
    className=""
  />
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="radio-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 lg:flex-col lg:gap-2 lg:space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Notify me about...</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <RadioGroup
    key="radio-0"
    id="radio-0"
    name=""
    className=""
  > 
    
      <div key="option1" className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="radio-0-option1" />
        <Label htmlFor="radio-0-option1">
          All new messages
        </Label>  
      </div>
    

      <div key="option2" className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="radio-0-option2" />
        <Label htmlFor="radio-0-option2">
          Direct messages and mentions
        </Label>  
      </div>
    

      <div key="demo-2" className="flex items-center space-x-2">
        <RadioGroupItem value="demo-2" id="radio-0-demo-2" />
        <Label htmlFor="radio-0-demo-2">
          Nothing
        </Label>  
      </div>
    
  </RadioGroup>
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="date-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Date of birth</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
    <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className="justify-start text-left font-normal w-full"
        id="date-0"
        name=""
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span className="text-muted-foreground">
          Pick a date
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single" 
        initialFocus
      />
    </PopoverContent>
  </Popover>
  
                </FormControl>
                <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">

  <div
    key="text-1"
    className="text-left">
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Email Notifications</h3>
  </div>
  
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="switch-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="hidden shrink-0">Marketing emails</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <div
    key="switch-0"
    className="rounded-md border p-4 lg:border-0 lg:p-0 flex justify-between items-center space-x-2"
  >
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="switch-0">
        Marketing emails
      </Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about new products, features, and more.
      </p>
    </div>
    <Switch id="switch-0" />
  </div>
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="switch-1"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="hidden shrink-0">Security emails</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <div
    key="switch-1"
    className="rounded-md border p-4 lg:rounded-md lg:border lg:p-4 md:rounded-md md:border md:p-4 flex justify-between items-center space-x-2"
  >
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="switch-1">
        Security emails
      </Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about your account security.
      </p>
    </div>
    <Switch id="switch-1" />
  </div>
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="button-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="hidden shrink-0">Button</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <Button
    key="button-0"
    id="button-0"
    name=""
    className="w-full"
  >
    Submit
  </Button>

                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="checkbox-group-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Sidebar</FormLabel>
              <FormDescription className="-mt-2 mb-2.5">
                  Select the items you want to display in the sidebar.
                </FormDescription>
              <div className="w-full">
                <FormControl>
                  
  <div
    key="checkbox-group-0"
    className="flex flex-col space-y-2"
  >
    
      <div key="option1" className="flex items-center space-x-2">
        <Checkbox
          id="checkbox-group-0-option1"
          name=""
          defaultChecked={false}
        />
        <Label htmlFor="checkbox-group-0-option1">
          Option 1
        </Label>
      </div>
    

      <div key="option2" className="flex items-center space-x-2">
        <Checkbox
          id="checkbox-group-0-option2"
          name=""
          defaultChecked={true}
        />
        <Label htmlFor="checkbox-group-0-option2">
          Option 4
        </Label>
      </div>
    
  </div>
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="checkbox-1"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="hidden shrink-0">Checkbox</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <div
    key="checkbox-1"
    className="border-0 p-0 lg:rounded-md lg:border lg:p-4 flex items-start space-x-2"
  >
    <Checkbox id="checkbox-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="checkbox-1">
        Checkbox
      </Label>
      <p className="text-sm text-muted-foreground">
        Checkbox Description
      </p>
    </div>
  </div>
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="text-input-1"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">Text Input</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <Input
    key="text-input-1"
    placeholder=""
    type="text"
    id="text-input-1"
    name=""
    className=""
  />  
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="file-input-0"
          render={({ field }) => (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 space-y-0 items-start"
            >
              <FormLabel className="flex shrink-0">File Input</FormLabel>
              
              <div className="w-full">
                <FormControl>
                  
  <Input
    key="file-input-0"
    placeholder=""
    type="file"
    id="file-input-0"
    name=""
    className=""
  />  
  
                </FormControl>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </form>
  </Form>
);
}
