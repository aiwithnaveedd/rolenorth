'use client';

import { useState } from 'react';
import { uploadResume } from '@/app/actions/uploadResume'; // Server Action
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';

export function UploadResumeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMessage('');

    try {
      const result = await uploadResume(formData);
      
      if (result.success) {
        setMessage('Analysis completed successfully!');
        // TODO: Redirect to report page
        window.location.href = `/reports/${result.reportId}`;
      } else {
        setMessage(result.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Failed to process resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <Label htmlFor="resume">Resume (PDF or DOCX)</Label>
        <Input 
          id="resume" 
          name="resume" 
          type="file" 
          accept=".pdf,.docx" 
          required 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentLocation">Current Location</Label>
          <Input 
            id="currentLocation" 
            name="currentLocation" 
            placeholder="Karachi, Pakistan" 
            required 
          />
        </div>
        <div>
          <Label htmlFor="targetLocation">Target Location (Optional)</Label>
          <Input 
            id="targetLocation" 
            name="targetLocation" 
            placeholder="Remote / Dubai" 
          />
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isLoading} className="w-full">
        {isLoading ? (
          <> <Loader2 className="mr-2 animate-spin" /> Analyzing Resume... </>
        ) : (
          <> <Upload className="mr-2" /> Upload & Analyze Resume </>
        )}
      </Button>

      {message && <p className="text-center">{message}</p>}
    </form>
  );
}