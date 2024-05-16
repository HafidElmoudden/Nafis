import React, { useRef, useState } from 'react';
import UploadIcon from 'assets/icons/upload-icon.svg'
import DocumentIcon from 'assets/icons/document-icon.svg'
import TrashIcon from 'assets/icons/trash-icon.svg'
import { map } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function FileChooserSection({ label, subLabel, id, icon, register, multiple = false, showUploadedFiles = false, supportedFormats = [], comboBoxData = [], ...rest }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dialogState, setDialogState] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(files);
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const acceptTypes = supportedFormats.map(format => `.${format}`).join(', ');

    const renderSupportedFileTypes = () => {
        if (supportedFormats.length === 0) return null;
        return (
            <div className='text-sm text-muted-foreground'>
                {supportedFormats.map(e => e.toUpperCase()).join(', ')} :يمكنك رفع الملفات من نوع
            </div>
        );
    }

    const closeDialog = () => {
        setDialogState(false);
    }

    const openDialog = () => {
        setDialogState(true);
    }

    return (
        <div className='flex gap-12 w-full flex-row-reverse'>
            <div className='flex-col text-right w-52'>
                <label className='text-sm font-semibold text-black'>{label}</label><br />
                {subLabel && <span className='text-sm text-muted-foreground'>{subLabel}</span>}
            </div>
            <div className="flex flex-col">
                <div
                    className='flex flex-col justify-center items-center gap-3 focus-within:outline w-[400px] h-[126px] focus-within:outline-primary focus-within:border-transparent bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden cursor-pointer'
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <img src={UploadIcon} alt='upload icon' className='size-10' />
                    <div className='text-[14px]'><span className='text-[#6941C6] font-semibold'>اضغط لرفع الملف</span> او اسحب الملف هنا</div>
                    <div className='text-[14px]'>{renderSupportedFileTypes()}</div>
                    <input
                        type="file"
                        id={id}
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept={acceptTypes}
                        multiple={multiple}

                    />
                </div>
                <br />
                {selectedFiles.length > 0 && showUploadedFiles && (
                    <div className='flex flex-col gap-1'>
                        {selectedFiles.map((file) => (
                            <div className='relative flex flex-row-reverse justify-start items-center px-3 gap-3 focus-within:outline w-[400px] h-[72px] focus-within:outline-primary focus-within:border-transparent bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                                <img src={DocumentIcon} alt='document icon' className='size-10' />
                                <div
                                    className='flex flex-col '
                                    key={file.name}
                                >
                                    <div className='text-[14px] font-semibold font-inter'>{file.name}</div>
                                    <div class="text-[14px] text-muted-foreground font-inter">
                                        {Math.floor(file.size / 1024)}
                                        {file.size > 1048576 ? ' MB' : ' KB'}
                                    </div>
                                </div>
                                <img
                                    src={TrashIcon}
                                    onClick={openDialog}
                                    alt="trash icon"
                                    class="size-5 absolute top-4 left-4 transition-all duration-100 hover:scale-110 cursor-pointer"
                                />

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Dialog open={dialogState} onOpenChange={setDialogState}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>تأكيد الحذف</DialogTitle>
                        <DialogDescription>
                            هل أنت متأكد من حدف هذا الملف؟
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary" onClick={closeDialog}>الغاء</Button>
                        <Button type="submit">تأكيد</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FileChooserSection;
